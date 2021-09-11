import * as dotenv from "dotenv"
dotenv.config()

import { MongoClient } from "mongodb"

const URI = process.env.MONGO_URI || "localhost"
/*
 ** Setting-Up MongoDB Connection
 ** @return MongoDb Client
 */
const MongoDbInit = async () => {
  // Initialize MongoDb
  const client = new MongoClient(URI)

  try {
    // Connect To MongoDb
    await client.connect()
    return client.db(process.env.DB_NAME)
  } catch (error) {
    throw new Error("Cannot Connect to Database")
  }
}

export default MongoDbInit
