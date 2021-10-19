import Topic, { COLLECTION_NAME } from "../model/Topicdao"
import { Filter } from "mongodb"
import { toObjectId } from "../../helpers/utils"
import Connection from "../../MongoDbInit"

Connection.open()
const db = Connection.Db

export default class TopicRepo {
  /**
   *
   * @param params
   * @returns
   */
  static async AddTopic(params: Topic) {
    return await db.collection(COLLECTION_NAME).insertOne(params)
  }
  /**
   *
   * @returns
   */
  static async FindAllTopics() {
    return await db.collection(COLLECTION_NAME).find().toArray()
  }
  /**
   *
   * @param query
   * @returns
   */
  static async FindTopic(query: { _id: string }) {
    return await db.collection(COLLECTION_NAME).findOne(toObjectId(query._id))
  }
  /**
   *
   * @param filter :
   * @param params
   * @returns
   */
  static async UpdateTopic(filter: Filter<any>, params: any) {
    return await db.collection(COLLECTION_NAME).updateOne(filter, params)
  }
  /**
   *
   * @param query
   * @returns
   */
  static async DeleteTopic(query: { _id: string }) {
    return await db.collection(COLLECTION_NAME).deleteOne(toObjectId(query._id))
  }
}
