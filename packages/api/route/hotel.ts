import { db } from "client/mongoClient";
import express, { Request, Response } from "express";

const hotelRouter = express.Router();

hotelRouter.get("/hotels/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  res.send("hotels");
});

hotelRouter.get("/hotels", async (req, res) => {
  const collection = db.collection("hotels");
  const data = await collection.find().toArray();
  res.send(data);
});

export default hotelRouter;
