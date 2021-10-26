import express, { Request, Response } from "express"
import { Db } from "mongodb"
import Connection from "./MongoDbInit"
import cors from "cors"
import { router as userController } from "./routes/user"

const app = express()

const port = process.env.PORT || "8001"
app.set("port", port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(userController)

Connection.open()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`)
    })
  })
  .catch((e) => {
    console.error("Error Connecting To Database", e)
  })
