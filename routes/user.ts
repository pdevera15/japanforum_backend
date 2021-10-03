import express, { Request, Response } from "express"
import UserRepo from "../database/repository/UsersRepo"
import Connection from "../MongoDbInit"
import { generateAccessToken } from "../helpers/auth"

const router = express.Router()
Connection.open()

router.post("/login", (req: Request, res: Response) => {
  if (req.body) {
    let username = req.body.username
    let password = req.body.password

    UserRepo.FindUser(Connection.Db, { username, password }).then((data) => {
      if (data.length === 0) {
        res.status(403).send("No User Found")
      } else {
        res.send(generateAccessToken(username))
      }
    })
  } else {
    res.sendStatus(403)
  }
})

router.post("/register", (req: Request, res: Response) => {})

export { router }
