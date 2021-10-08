import Topic, { COLLECTION_NAME } from "../model/Topicdao";
import { Db, MongoClient, ObjectId, Filter } from "mongodb";

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
  static async UpdateTopic(db: Db, filter: Filter<any>, params: any) {
    return await db.collection(COLLECTION_NAME).updateOne(filter, params);
  }
  // Delete
}
