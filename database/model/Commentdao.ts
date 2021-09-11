import { Document, Collection } from "mongodb"

export const COLLECTION_NAME = "comments"

export default interface Comment extends Document {
  topic_id: string
  user_id: string
  date_created?: string
  date_updated?: string
  comment: string
}
