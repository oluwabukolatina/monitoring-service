import { CreateCommitInterface } from './commit.interface';
import CommitModel from './commit.model';
import RepositoryService from '../repository/repository.service';
import { RepositoryInterface } from '../repository/repository.interface';

const CommitService = {
  async create(data: CreateCommitInterface) {
    return CommitModel.create(data);
  },
  async findOne(sha: string) {
    return CommitModel.findOne({ sha });
  },
  async find(repository: RepositoryInterface['_id']) {
    return CommitModel.find({ repository });
  },
  async getTopAuthorsByCommitCount(
    repository: RepositoryInterface['_id'],
    topN: number
  ) {
    return CommitModel.aggregate([
      { $match: { repository } },
      {
        $group: {
          _id: '$authorEmail', // Group by author email
          authorName: { $first: '$authorName' }, // Get the author's name
          commitCount: { $sum: 1 }, // Count the number of commits
        },
      },
      { $sort: { commitCount: -1 } }, // Sort by commit count in descending order
      { $limit: topN }, // Limit to top N authors
    ]);
  },
  async getCommitsByRepositoryName(owner: string, repoName: string) {
    const repository = await RepositoryService.find({ owner, name: repoName });
    if (!repository) {
      throw new Error(`Repository ${repoName} not found for owner ${owner}`);
    }
    return CommitModel.find({ repository: repository._id }).sort({ date: -1 });
  },
};
export default CommitService;
