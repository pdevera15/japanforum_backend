import Comment, { COLLECTION_NAME } from "../model/Commentdao"
import { Db } from "mongodb"
import Connection from "../../MongoDbInit"
import { toObjectId } from "../../helpers/utils"

Connection.open()
const db = Connection.Db

export default class CommentRepo {
  /**
   *
   * @param doc
   * @returns
   */
  static async InsertComment(doc: Comment) {
    return await db.collection(COLLECTION_NAME).insertOne(doc)
  }
  /**
   *
   * @returns
   */
  static async FindAllComment() {
    return await db.collection(COLLECTION_NAME).find().toArray()
  }

  /**
   *
   * @param query
   * @returns
   */
  static async FindComment(query: { _id: string }) {
    return await db.collection(COLLECTION_NAME).findOne(toObjectId(query._id))
  }
  // Update

  // Delete
}
