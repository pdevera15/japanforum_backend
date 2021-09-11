import Comment, { COLLECTION_NAME } from "../model/Commentdao"
import { Db, ObjectId } from "mongodb"

export default class CommentRepo {
  // Create
  static async InsertComment(MongoClient: Db, doc: Comment) {
    return await MongoClient.collection(COLLECTION_NAME).insertOne(doc)
  }
  // Get All Comment
  static async FindAllComment(MongoClient: Db) {
    return await MongoClient.collection(COLLECTION_NAME).find().toArray()
  }

  // Get Comment
  static async FindComment(MongoClient: Db, query: { _id: string }) {
    let id = new ObjectId(query._id)
    return await MongoClient.collection(COLLECTION_NAME).findOne(id)
  }
  // Update

  // Delete
}
