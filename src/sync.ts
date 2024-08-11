import { fetchCommits, fetchRepoDetails } from './api';
import RepositoryService from './component/repository/repository.service';
import RepositoryModel from './component/repository/repository.model';
import { CommitPayloadInterface } from './component/commit/commit.interface';
import CommitService from './component/commit/commit.service';
import CommitModel from './component/commit/commit.model';
import { monitor } from './monitor';

export const SEARCH_INTERVAL =3600000;
const Sync = {
  async syncRepository(data: {
    owner: string;
    repository: string;
    since?: string;
  }) {
    const { owner, repository, since } = data;
    const repoDetails = await fetchRepoDetails(owner, repository);
    const findRepository = await RepositoryService.findOrCreateRepository({
      owner,
      name: repository,
    });
    await RepositoryModel.findByIdAndUpdate(
      { _id: findRepository._id },
      {
        description: repoDetails.description,
        url: repoDetails.html_url,
        language: repoDetails.language,
        forksCount: repoDetails.forks_count,
        starsCount: repoDetails.stargazers_count,
        openIssuesCount: repoDetails.open_issues_count,
        watchersCount: repoDetails.watchers_count,
        createdAt: repoDetails.created_at,
        updatedAt: repoDetails.updated_at,
      }
    );
    const commits = await fetchCommits(owner, findRepository.name, since);
    return Promise.all(
      commits.map(async (commit: CommitPayloadInterface) => {
        try {
          const existingCommit = await CommitService.findOne(commit.sha);
          if (!existingCommit) {
            return CommitService.create({
              sha: commit.sha,
              message: commit.commit.message,
              authorName: commit.commit.author.name,
              authorEmail: commit.commit.author.email,
              date: commit.commit.author.date,
              url: commit.html_url,
              repository: findRepository._id,
            });
          } else {
            console.log(`Commit ${commit.sha} already exists`);
          }
        } catch (error) {
          console.error(error, `commit ${commit.sha}:`);
        }
      })
    );
  },
  async resetCommitsToDate(owner: string, repo: string, date: string) {
    const repository = await RepositoryService.find({ owner, name: repo });
    if (repository) {
      await CommitModel.deleteMany({ repository: repository._id });
      return monitor({ owner, repo, interval: SEARCH_INTERVAL, since: date });
    }
    return monitor({ owner, repo, interval: SEARCH_INTERVAL, since: date }); // Sync every hour
  },
};
export default Sync;
