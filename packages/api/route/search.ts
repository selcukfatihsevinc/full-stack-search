import { db } from "client/mongoClient";
import express, { Request, Response } from "express";

const searchRouter = express.Router();

const searchLimit = 5;

searchRouter.get("/search", async (req: Request, res: Response) => {
  const q = String(req.query.q)
    .split(" ")
    .map((i) => i.toLowerCase())
    .filter((i) => i.length > 2);

  const data = await db.collection("hotels").aggregate([
    { $match: { token: { $all: q } } },
    { $limit: searchLimit },
    { $addFields: { collection: "hotels" } },
    {
      $unionWith: {
        coll: "cities",
        pipeline: [
          { $match: { token: { $all: q } } },
          { $addFields: { collection: "cities" } },
          { $limit: searchLimit },
        ],
      },
    },
    {
      $unionWith: {
        coll: "countries",
        pipeline: [
          { $match: { token: { $all: q } } },
          { $addFields: { collection: "countries" } },
          { $limit: searchLimit },
        ],
      },
    },
    {
      $group: {
        _id: "$collection",
        data: {
          $push: {
            hotel_name: "$hotel_name",
            name: "$name",
            country: "$country",
          },
        },
      },
    },
  ]);

  const result = await data.toArray();
  res.send(result);
});

export default searchRouter;
