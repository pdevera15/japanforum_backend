import Comment, { COLLECTION_NAME } from "../model/Commentdao"
import Connection from "../../MongoDbInit"
import { toObjectId } from "../../helpers/utils"

Connection.open()
const db = Connection.Db

export const CommentRepo = {
  /**
   *
   * @param doc
   * @returns
   */
  InsertComment: async (doc: Comment) => {
    return await db.collection(COLLECTION_NAME).insertOne(doc)
  },
  /**
   *
   * @returns
   */
  FindAllComment: async () => {
    return await db.collection(COLLECTION_NAME).find().toArray()
  },

  /**
   *
   * @param query
   * @returns
   */
  FindComment: async (query: { _id: string }) => {
    return await db.collection(COLLECTION_NAME).findOne(toObjectId(query._id))
  },
  // Update

  // Delete
}
