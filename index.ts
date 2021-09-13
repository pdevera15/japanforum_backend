import express, { Request, Response } from "express"
import TopicRepo from "./database/repository/TopicRepo"
import UserRepo from "./database/repository/UsersRepo"
import User, { COLLECTION_NAME } from "./database/model/Usersdao"
import { Db } from "mongodb"
import MongoDb from "./MongoDbInit"
import cors from "cors"
import { Console } from "console"

let db: Db
const port = 8001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req: Request, res: Response) => {
  TopicRepo.FindAllTopics(db)
    .then((result) => {
      res.json(result)
    })
    .catch(() => {
      res.sendStatus(404)
    })
})

app.post("/finduser", (req: Request, res: Response) => {
  console.log(req.body)
  UserRepo.FindUser(db, req.body)
    .then((result) => {
      res.json(result)
    })
    .catch(() => {
      res.sendStatus(404)
    })
})

MongoDb()
  .then((client) => {
    db = client
    app.listen(port, () => {
      console.log("Listening TO PORT", port)
    })
  })
  .catch((e) => console.log("ERROR", e))
