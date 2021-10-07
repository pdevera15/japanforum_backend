import User, { COLLECTION_NAME } from "../model/Usersdao";
import { Db, Filter, ObjectId } from "mongodb";
export default class UsersRepo {
  /**
   * Insert a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be Inserted
   */
  static async InsertUser(
    MongoClient: Db,
    params: {
      username: string;
      hashPassword: string;
      email: string;
    }
  ) {
    return await MongoClient.collection(COLLECTION_NAME).insertOne({
      username: params.username,
      password: params.hashPassword,
      email: params.email,
      date_created: new Date(),
      date_updated: new Date(),
      delete_flag: false,
    });
  }

  // Get All Users
  static async FindAllUser(MongoClient: Db) {
    return await MongoClient.collection(COLLECTION_NAME).find().toArray();
  }

  /**
   * Find a user
   *
   * @param params - Filter Condition
   */
  static async FindUser(MongoClient: Db, params: any) {
    const { _id } = params;
    if (_id) {
      var o_id = new ObjectId(_id);
      params = { ...params, _id: o_id };
    }
    console.log(params);
    return await MongoClient.collection(COLLECTION_NAME).find(params).toArray();
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
    );
  }
  // Delete
}
