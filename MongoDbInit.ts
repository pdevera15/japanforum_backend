import * as dotenv from "dotenv"
import { MongoClient } from "mongodb"
dotenv.config()

const URI = process.env.MONGO_URI || "localhost"

export default class Connection {
  static db: MongoClient
  static async open() {
    if (this.db) return this.db.db(process.env.DB_NAME)
    const client = new MongoClient(URI)
    this.db = await client.connect()
    return this.db.db(process.env.DB_NAME)
  }
}
