import express, { Request, Response } from "express"
import { UsersRepo } from "../database/repository/UsersRepo"
import bcryptjs from "bcryptjs"
import { generateAccessToken } from "../helpers/auth"
import { ResponseMessage } from "../utils/ResponseUtils"
import { getId } from "../helpers/utils"

const router = express.Router()

router.post("/login", (req: Request, res: Response) => {
  if (req.body) {
    const username = req.body.username
    const password = req.body.password

    UsersRepo.FindUser(username).then((data) => {
      if (data.length === 0) {
        res.json({ result: 0, message: "No User Found" })
      } else {
        console.log(password, getId(data[0]._id))
        bcryptjs.compare(password, data[0].password).then((response) => {
          response
            ? res.json({
                token: generateAccessToken(username),
                username,
                id: getId(data[0]._id),
              })
            : res.json(ResponseMessage.LOGIN_FAILED)
        })
      }
    })
  } else {
    res.sendStatus(403)
  }
})

router.post("/register", (req: Request, res: Response) => {
  if (req.body) {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const saltRounds = 10
    let hashPassword
    bcryptjs.hash(password, saltRounds).then((hash) => {
      hashPassword = hash
      UsersRepo.InsertUser({ username, hashPassword, email })
        .then((response) => {
          response.acknowledged
            ? res.json(ResponseMessage.REGISTER_SUCCESS)
            : res.json(ResponseMessage.REGISTER_FAILED)
        })
        .catch((e) => {
          res.sendStatus(ResponseMessage.STATUS_500)
          console.log(e)
        })
    })
  } else {
    res.sendStatus(403)
  }
})

export { router }
