import {RepositoryInterface} from "../repository/repository.interface";

export interface CommitDocument extends Document {
  sha: string;
  message: string;
  authorName: string;
  authorEmail: string;
  date: Date;
  url: string;
  repository: RepositoryInterface['_id'];
}
