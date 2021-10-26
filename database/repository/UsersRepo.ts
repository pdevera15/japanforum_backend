import User, { COLLECTION_NAME } from "../model/Usersdao"
import { Filter, ObjectId } from "mongodb"
import Connection from "../../MongoDbInit"

export const UsersRepo = {
  /**
   * Insert a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be Inserted
   */
  InsertUser: async (params: {
    username: string
    hashPassword: string
    email: string
  }) => {
    return await Connection.getDb().collection(COLLECTION_NAME).insertOne({
      username: params.username,
      password: params.hashPassword,
      email: params.email,
      date_created: new Date(),
      date_updated: new Date(),
      delete_flag: false,
    })
  },

  /**
   * Get all users
   * @param
   * @returns Array of Users
   */
  FindAllUser: async () => {
    return await Connection.getDb().collection(COLLECTION_NAME).find().toArray()
  },

  /**
   * Find a user
   *
   * @param params - Filter Condition
   * @return Return a user
   */
  FindUser: async (params: any) => {
    const { _id } = params
    if (_id) {
      var o_id = new ObjectId(_id)
      params = { ...params, _id: o_id }
    }
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .find({ username: params })
      .toArray()
  },

  /**
   * Update a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be updated
   */
  UpdateUser: async (filter: Filter<any>, params: User) => {
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .updateOne(filter, params)
  },

  /**
   * Get password of users
   *
   * @param params - username
   */
  GetPassword: async (params: string) => {
    return await Connection.getDb()
      .collection(COLLECTION_NAME)
      .find({
        username: params,
      })
      .toArray()
  },
}
