import Topic, { COLLECTION_NAME } from "../model/Topicdao";
import { Db, MongoClient, ObjectId } from "mongodb";

export default class TopicRepo {
  // Create
  static async AddTopic(db: Db, params: Topic) {
    return await db.collection(COLLECTION_NAME).insertOne(params);
  }
  // Get All Topics
  static async FindAllTopics(db: Db) {
    return await db.collection(COLLECTION_NAME).find().toArray();
  }

  // Get Topic
  static async FindTopic(db: Db, query: { _id: string }) {
    let id = new ObjectId(query._id);
    return await db.collection(COLLECTION_NAME).findOne(id);
  }
  // Update

  // Delete
}
