import express, { Request, Response } from "express"
import { ApolloServer, gql } from "apollo-server-express"
import TopicRepo from "../database/repository/TopicRepo"
import UserRepo from "../database/repository/UsersRepo"
import { Db } from "mongodb"
import MongoDb from "../MongoDbInit"

let db: Db
MongoDb().then((client) => {
  db = client
})

const typeDefs = gql`
  type Topic {
    title: String
    author: User
    date_created: String
    date_updated: String
    context: String
  }
  type User {
    _id: String
    username: String
    password: String
    date_created: String
    date_updated: String
    delete_flag: String
    email: String
  }
  type Query {
    Topics: [Topic]
  }
`

const resolvers = {
  Query: {
    Topics: () => {
      return TopicRepo.FindAllTopics(db).then((res) => {
        console.log(res)
        return res
      })
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server
  .start()
  .then(() => {
    server.applyMiddleware({ app })
  })
  .catch((e) => {
    console.log(e)
  })

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
)
