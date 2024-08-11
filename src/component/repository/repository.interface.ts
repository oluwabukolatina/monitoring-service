import { Types } from 'mongoose';

export interface RepositoryInterface {
  _id: Types.ObjectId;
  name: string;
  description: string;
  url: string;
  language: number;
  forksCount: number;
  starsCount: number;
  openIssuesCount: number;
  watchersCount: number;
  repoCreatedAt: Date;
  repoUpdatedAt: Date;
}
export interface FindRepositoryInterface {
  name: string;
  owner: string;
}
