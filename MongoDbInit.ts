import * as dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";
dotenv.config();

const URI = process.env.MONGO_URI || "localhost";

export default class Connection {
  static mongoClient: MongoClient;
  static Db: Db;
  static async open() {
    if (this.mongoClient) return this.mongoClient;
    const client = new MongoClient(URI);
    this.mongoClient = await client.connect();
    this.Db = this.mongoClient.db(process.env.DB_NAME);
    return this.mongoClient;
  }
}
