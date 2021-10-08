import { Document, Collection } from "mongodb";

export const COLLECTION_NAME = "post";

export default interface Topic extends Document {
  title: string;
  author_id: string;
  date_created: string | Date;
  date_updated: string | Date;
  context: string;
}
