import { Types } from 'mongoose';
import { RepositoryInterface } from '../repository/repository.interface';

export interface CommitInterface {
  _id: Types.ObjectId;
  sha: string;
  message: string;
  authorName: string;
  authorEmail: string;
  date: Date;
  url: string;
  repository: RepositoryInterface['_id'];
}
export interface CommitPayloadInterface {
  sha: string;
  commit: {
    message: string;
    author: { name: string; email: string; date: Date };
  };
  html_url: string;
}

export interface CreateCommitInterface {
  sha: string;
  authorName: string;
  message: string;
  authorEmail: string;
  date: Date;
  url: string;
  repository: RepositoryInterface['_id'];
}
