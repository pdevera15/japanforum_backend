import express, { Request, Response } from "express";
import UserRepo from "../database/repository/UsersRepo";
import Connection from "../MongoDbInit";
import { generateAccessToken } from "../helpers/auth";
import bcryptjs from "bcryptjs";

const router = express.Router();
Connection.open();

router.post("/login", (req: Request, res: Response) => {
  if (req.body) {
    const username = req.body.username;
    const password = req.body.password;

    UserRepo.FindUser(Connection.Db, { username, password }).then((data) => {
      if (data.length === 0) {
        res.status(403).send("No User Found");
      } else {
        res.send(generateAccessToken(username));
      }
    });
  } else {
    res.sendStatus(403);
  }
});

router.post("/register", (req: Request, res: Response) => {
  if (req.body) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const saltRounds = 10;
    let hashPassword;
    bcryptjs.hash(password, saltRounds).then((hash) => {
      hashPassword = hash;
      UserRepo.InsertUser(Connection.Db, { username, hashPassword, email })
        .then((response) => {
          response.acknowledged
            ? res.sendStatus(200)
            : res.status(403).send("Failed To Insert");
        })
        .catch((e) => {
          res.sendStatus(403);
          console.log(e);
        });
    });
  }
});

export { router };
