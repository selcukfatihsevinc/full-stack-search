import { db } from "client/mongoClient";
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";

const hotelRouter = express.Router();

hotelRouter.get("/hotels/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await db.collection("hotels").findOne({ _id: new ObjectId(id) });
  res.send(data);
});

hotelRouter.get("/hotels", async (req, res) => {
  const data = await db.collection("hotels").find().toArray();
  res.send(data);
});

export default hotelRouter;
