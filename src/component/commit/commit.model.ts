import { CommitDocument } from './commit.document';
import { CommitModelInterface } from './commit-model.interface';
import { model, Schema } from 'mongoose';

const CommitSchema = new Schema(
  {
    sha: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    authorName: { type: String },
    authorEmail: { type: String },
    date: { type: Date, required: true },
    url: { type: String },
    repository: { type: Schema.Types.ObjectId, ref: 'Repository' },
  },
  { timestamps: true }
);

const CommitModel = model<CommitDocument, CommitModelInterface>(
  'Commit',
  CommitSchema
);

export default CommitModel;
