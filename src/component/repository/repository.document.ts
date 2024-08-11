export interface RepositoryDocument extends Document {
  name: string,
  description: string,
  url: string,
  language: number,
  forksCount:number,
  starsCount:number,
  openIssuesCount: number,
  watchersCount:number;
  repoCreatedAt: Date;
  repoUpdatedAt: Date;
}
