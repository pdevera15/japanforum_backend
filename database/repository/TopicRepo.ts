import Topic, { COLLECTION_NAME } from "../model/Topicdao"
import { Db, ObjectId } from "mongodb"

export default class TopicRepo {
  // Create

  // Get All Topics
  static async FindAllTopics(MongoClient: Db) {
    return await MongoClient.collection(COLLECTION_NAME)
      .find({
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "Author",
        },
      })
      .toArray()
  }

  // Get Topic
  static async FindTopic(MongoClient: Db, query: { _id: string }) {
    let id = new ObjectId(query._id)
    return await MongoClient.collection(COLLECTION_NAME).findOne(id)
  }
  // Update

  // Delete
}
