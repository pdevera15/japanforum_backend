import express, { Request, Response } from "express"
import TopicRepo from "./database/repository/TopicRepo"
import UserRepo from "./database/repository/UsersRepo"
import { Db } from "mongodb"
import Connection from "./MongoDbInit"
import cors from "cors"

const app = express()

let db: Db
const port = process.env.PORT || "8001"
app.set("port", port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/alltopics", (req: Request, res: Response) => {
  TopicRepo.FindAllTopics(db)
    .then((result) => {
      res.json(result)
    })
    .catch(() => {
      res.sendStatus(404)
    })
})

app.post("/finduser", (req: Request, res: Response) => {
  UserRepo.FindUser(db, req.body)
    .then((result) => {
      res.json(result)
    })
    .catch(() => {
      res.sendStatus(404)
    })
})

Connection.open()
  .then((res) => {
    db = res
    app.listen(port, () => {
      console.log(`Server running at port ${port}`)
    })
  })
  .catch((e) => {
    console.error("Error Connecting To Database", e)
  })
