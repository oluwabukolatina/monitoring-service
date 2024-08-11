import {connectToDatabase} from "./db";
import Sync from "./sync";
import RepositoryService from "./component/repository/repository.service";
import CommitService from "./component/commit/commit.service";

const owner = 'chromium';
const repoName = 'chromium';
describe('sync test', () => {
    beforeAll(() => {
        connectToDatabase()
            .then(async (result) => {
                const { collections } = result.connection;
                await Promise.all(
                    Object.values(collections).map(async (collection) => {
                        await collection.deleteMany({});
                    }),
                );
            })
        return Sync.syncRepository({ owner, repository: repoName });
    });
    it('should sync commits', async () => {
        const findRepo = await RepositoryService.find({ name: repoName, owner });
        const commits = await CommitService.find(findRepo._id);
        const commit = await CommitService.findOne(commits[7].sha);
        expect(commit.repository.equals(findRepo._id)).toBe(true);
    });
    it('should return the top N authors by commit count', async () => {
        const findRepository = await RepositoryService.find({
            name: repoName,
            owner,
        });
        const topAuthors = await CommitService.getTopAuthorsByCommitCount(
            findRepository._id,
            20
        );
        expect(topAuthors.length).toBeGreaterThan(0);
        topAuthors.forEach((one)=> {
            expect(one).toHaveProperty('_id', );
            expect(one).toHaveProperty('authorName', );
            expect(one).toHaveProperty('commitCount', );

        })
    });
});
