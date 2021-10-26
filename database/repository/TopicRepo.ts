import Topic, { COLLECTION_NAME } from "../model/Topicdao"
import { Filter } from "mongodb"
import { toObjectId } from "../../helpers/utils"
import Connection from "../../MongoDbInit"

export const TopicRepo = {
  /**
   *
   * @param params
   * @returns
   */
  AddTopic: async (params: Topic) => {
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .insertOne(params)
  },
  /**
   *
   * @returns
   */
  FindAllTopics: async () => {
    return await Connection.getDb().collection(COLLECTION_NAME).find().toArray()
  },
  /**
   *
   * @param query
   * @returns
   */
  FindTopic: async (query: { _id: string }) => {
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .findOne(toObjectId(query._id))
  },
  /**
   *
   * @param filter :
   * @param params
   * @returns
   */
  UpdateTopic: async (filter: Filter<any>, params: any) => {
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .updateOne(filter, params)
  },
  /**
   *
   * @param query
   * @returns
   */
  DeleteTopic: async (query: { _id: string }) => {
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .deleteOne(toObjectId(query._id))
  },
}
