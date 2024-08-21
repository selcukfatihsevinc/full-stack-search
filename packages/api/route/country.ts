import { db } from "client/mongoClient";
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";

const countryRouter = express.Router();

countryRouter.get("/countries/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await db
    .collection("countries")
    .findOne({ _id: new ObjectId(id) });
  res.send(data);
});

export default countryRouter;
