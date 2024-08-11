import { RepositoryDocument } from './repository.document';
import { RepositoryModelInterface } from './repository-model.interface';
import { model, Schema } from 'mongoose';

const RepositorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    owner: { type: String, required: true, unique: true },
    description: { type: String },
    url: { type: String },
    language: { type: String },
    forksCount: { type: Number },
    starsCount: { type: Number },
    openIssuesCount: { type: Number },
    watchersCount: { type: Number },
    repoCreatedAt: { type: Date },
    repoUpdatedAt: { type: Date },
  },
  { timestamps: true }
);

const RepositoryModel = model<RepositoryDocument, RepositoryModelInterface>(
  'Repository',
  RepositorySchema
);

export default RepositoryModel;
