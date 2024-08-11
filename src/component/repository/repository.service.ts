import { FindRepositoryInterface } from './repository.interface';
import RepositoryModel from './repository.model';

const RepositoryService = {
  async findOrCreateRepository(data: FindRepositoryInterface) {
    const repository = await this.find(data);
    if (repository) return repository;
    return this.create(data);
  },
  async find(data: FindRepositoryInterface) {
    return RepositoryModel.findOne(data);
  },
  async create(data: FindRepositoryInterface) {
    return RepositoryModel.create(data);
  },
};
export default RepositoryService;
