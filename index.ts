import express, { Request, Response } from "express"
import TopicRepo from "./database/repository/TopicRepo"
import UserRepo from "./database/repository/UsersRepo"
import { Db } from "mongodb"
import Connection from "./MongoDbInit"
import cors from "cors"
import { router as userController } from "./routes/user"
import { authenticateToken } from "./helpers/auth"

const app = express()

let db: Db
const port = process.env.PORT || "8001"
app.set("port", port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(userController)

app.get("/alltopics", authenticateToken, (req: Request, res: Response) => {
  TopicRepo.FindAllTopics(Connection.Db)
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
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
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`)
    })
  })
  .catch((e) => {
    console.error("Error Connecting To Database", e)
  })
