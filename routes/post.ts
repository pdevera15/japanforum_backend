import express, { Request, Response } from "express"
import { TopicRepo } from "../database/repository/TopicRepo"
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

/**
 * Create new topic
 * @param title, author_id, context
 */
router.post("/topics", authenticateToken, (req: Request, res: Response) => {
  if (req.body) {
    const { title, context, author: author_id } = req.body
    const date_created = new Date()
    const date_updated = new Date()
    TopicRepo.AddTopic({
      title,
      context,
      date_created,
      date_updated,
      author_id,
    }).then((response: any) => {
      response.acknowledged
        ? res.json(ResponseMessage.POST_SUCCESS)
        : res.json(ResponseMessage.POST_FAILED)
    })
  }
})

/**
 * Update Topic
 */
router.put("/topics", authenticateToken, (req: Request, res: Response) => {
  if (req.body) {
    const { _id, title, context, author: author_id } = req.body
    const date_updated = new Date()
    TopicRepo.UpdateTopic(
      { _id: new ObjectId(_id) },
      {
        title,
        context,
        date_updated,
        author_id,
      }
    ).then((response: any) => {
      response.acknowledged
        ? res.json(ResponseMessage.POST_SUCCESS)
        : res.json(ResponseMessage.POST_FAILED)
    })
  }
})

/**
 * Find all topic
 */
router.post("/topics", authenticateToken, (req: Request, res: Response) => {
  if (req.body) {
    const { _id, title, context, author_id: author } = req.body
    const date_updated = new Date()
    TopicRepo.FindAllTopics().then((response: any) => {
      res.json(response)
    })
  }
})

/**
 * Find all topic
 */
router.get("/topics", (req: Request, res: Response) => {
  TopicRepo.FindAllTopics().then((response) => {
    res.json(response)
  })
})

export { router }
