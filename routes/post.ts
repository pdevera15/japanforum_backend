import express, { Request, Response } from "express"
import TopicRepo from "../database/repository/TopicRepo"
import { authenticateToken } from "../helpers/auth"
import { ResponseMessage } from "../utils/ResponseUtils"
import { ObjectId } from "mongodb"

const router = express.Router()

type Topic = {
  title: string
  context: string
  date_created: string
  date_updated: string
  author_id: string
}

router.post(
  "/create_topic",
  authenticateToken,
  (req: Request, res: Response) => {
    if (req.body) {
      const title = req.body.title
      const context = req.body.context
      const date_created = new Date()
      const date_updated = new Date()
      const author_id = req.body.author
      TopicRepo.AddTopic({
        title,
        context,
        date_created,
        date_updated,
        author_id,
      }).then((response) => {
        response.acknowledged
          ? res.json(ResponseMessage.POST_SUCCESS)
          : res.json(ResponseMessage.POST_FAILED)
      })
    }
  }
)

router.post(
  "/update_topic",
  authenticateToken,
  (req: Request, res: Response) => {
    if (req.body) {
      const _id = req.body._id
      const title = req.body.title
      const context = req.body.context
      const date_updated = new Date()
      const author_id = req.body.author
      TopicRepo.UpdateTopic(
        { _id: new ObjectId(_id) },
        {
          title,
          context,
          date_updated,
          author_id,
        }
      ).then((response) => {
        response.acknowledged
          ? res.json(ResponseMessage.POST_SUCCESS)
          : res.json(ResponseMessage.POST_FAILED)
      })
    }
  }
)

router.get("/get_topics", (req: Request, res: Response) => {
  if (req.body) {
    const _id = req.body._id
    const title = req.body.title
    const context = req.body.context
    const date_updated = new Date()
    const author_id = req.body.author
    TopicRepo.FindAllTopics().then((response) => {
      res.json(response)
    })
  }
})

router.post("/get_topics", authenticateToken, (req: Request, res: Response) => {
  if (req.body) {
    const _id = req.body._id
    const title = req.body.title
    const context = req.body.context
    const date_updated = new Date()
    const author_id = req.body.author
    TopicRepo.FindAllTopics().then((response) => {
      res.json(response)
    })
  }
})
