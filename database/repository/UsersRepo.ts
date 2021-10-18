import User, { COLLECTION_NAME } from "../model/Usersdao";
import { Filter, ObjectId } from "mongodb";
import Connection from "../../MongoDbInit";

Connection.open();
const db = Connection.Db;

export default class UsersRepo {
  /**
   * Insert a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be Inserted
   */
  static async InsertUser(params: {
    username: string;
    hashPassword: string;
    email: string;
  }) {
    return await db.collection(COLLECTION_NAME).insertOne({
      username: params.username,
      password: params.hashPassword,
      email: params.email,
      date_created: new Date(),
      date_updated: new Date(),
      delete_flag: false,
    });
  }

  // Get All Users
  static async FindAllUser() {
    return await db.collection(COLLECTION_NAME).find().toArray();
  }

  /**
   * Find a user
   *
   * @param params - Filter Condition
   */
  static async FindUser(params: any) {
    const { _id } = params;
    if (_id) {
      var o_id = new ObjectId(_id);
      params = { ...params, _id: o_id };
    }
    console.log(params);
    return await db.collection(COLLECTION_NAME).find(params).toArray();
  }

  /**
   * Update a users
   *
   * @param filter - The filter used to select the document to update
   * @param params - Data to be updated
   */
  static async UpdateUser(filter: Filter<any>, params: User) {
    return await db.collection(COLLECTION_NAME).updateOne(filter, params);
  }

  /**
   * Get password of users
   *
   * @param params - username
   */
  static async GetPassword(params: string) {
    return await db
      .collection(COLLECTION_NAME)
      .find({
        username: params,
      })
      .toArray();
  }
}
