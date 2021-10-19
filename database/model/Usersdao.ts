import { Document } from "mongodb"

export const COLLECTION_NAME = "users"

export default interface User extends Document {
  _id: string
  username: string
  password: string
  date_created: string
  date_updated: string
  delete_flag: string
  email: string
}
