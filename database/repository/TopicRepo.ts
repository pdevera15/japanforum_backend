import Topic, { COLLECTION_NAME } from "../model/Topicdao";
import { Db, Filter } from "mongodb";
import { toObjectId } from "../../helpers/utils";
import Connection from "../../MongoDbInit";

Connection.open();
const db = Connection.Db;

export default class TopicRepo {
  // Create
  static async AddTopic(params: Topic) {
    return await db.collection(COLLECTION_NAME).insertOne(params);
  }
  // Get All Topics
  static async FindAllTopics() {
    return await db.collection(COLLECTION_NAME).find().toArray();
  }
  // Get Topic
  static async FindTopic(query: { _id: string }) {
    return await db.collection(COLLECTION_NAME).findOne(toObjectId(query._id));
  }
  // Update
  static async UpdateTopic(filter: Filter<any>, params: any) {
    return await db.collection(COLLECTION_NAME).updateOne(filter, params);
  }
  // Delete
  static async DeleteTopic(query: { _id: string }) {
    return await db
      .collection(COLLECTION_NAME)
      .deleteOne(toObjectId(query._id));
  }
}
