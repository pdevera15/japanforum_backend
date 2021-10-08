import express, { Request, Response } from "express";
import TopicRepo from "../database/repository/TopicRepo";
import Connection from "../MongoDbInit";
import { authenticateToken } from "../helpers/auth";
import { ResponseMessage } from "../utils/ResponseUtils";

const router = express.Router();
Connection.open();

type Topic = {
  title: string;
  context: string;
  date_created: string;
  date_updated: string;
  author_id: string;
};

router.post(
  "/create_post",
  authenticateToken,
  (req: Request, res: Response) => {
    if (req.body) {
      const title = req.body.title;
      const context = req.body.context;
      const date_created = new Date();
      const date_updated = new Date();
      const author_id = req.body.author;
      TopicRepo.AddTopic(Connection.Db, {
        title,
        context,
        date_created,
        date_updated,
        author_id,
      }).then((response) => {
        response.acknowledged
          ? res.json(ResponseMessage.POST_SUCCESS)
          : res.json(ResponseMessage.POST_FAILED);
      });
    }
  }
);
