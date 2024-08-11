import {RepositoryDocument} from "./repository.document";
import {RepositoryInterface} from "./repository.interface";
import {Model} from "mongoose";

export interface RepositoryModelInterface extends Model<RepositoryDocument> {
  build(attr: RepositoryInterface): RepositoryDocument;
}
