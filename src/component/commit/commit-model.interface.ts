import {CommitDocument} from "./commit.document";
import {CommitInterface} from "./commit.interface";
import {Model} from "mongoose";

export interface CommitModelInterface extends Model<CommitDocument> {
  build(attr: CommitInterface): CommitDocument;
}
