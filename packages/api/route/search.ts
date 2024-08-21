import { db } from "client/mongoClient";
import express, { Request, Response } from "express";

const searchRouter = express.Router();

searchRouter.get("/search", async (req: Request, res: Response) => {
  const q = req.query.q;
  res.send("search");
});

export default searchRouter;
