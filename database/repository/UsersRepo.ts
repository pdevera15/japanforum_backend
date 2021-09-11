import User, { COLLECTION_NAME } from "../model/Usersdao"
import { Db, Filter } from "mongodb"

export default class UsersRepo {
  /**
   * Insert a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be Inserted
   */
  static async InsertUser(MongoClient: Db, params: User) {
    return await MongoClient.collection(COLLECTION_NAME).insertOne({ params })
  }

  // Get All Users
  static async FindAllUser(MongoClient: Db) {
    return await MongoClient.collection(COLLECTION_NAME).find().toArray()
  }

  /**
   * Find a user
   *
   * @param params - Filter Condition
   */
  static async FindUser(MongoClient: Db, params: any) {
    return await MongoClient.collection(COLLECTION_NAME).findOne(params)
  }

  /**
   * Update a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be updated
   */
  static async UpdateUser(MongoClient: Db, filter: Filter<any>, params: User) {
    return await MongoClient.collection(COLLECTION_NAME).updateOne(
      filter,
      params
    )
  }
  // Delete
}
