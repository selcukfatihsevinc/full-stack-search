import { db } from "client/mongoClient";
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";

const cityRouter = express.Router();

cityRouter.get("/cities/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await db.collection("cities").findOne({ _id: new ObjectId(id) });
  res.send(data);
});

export default cityRouter;
