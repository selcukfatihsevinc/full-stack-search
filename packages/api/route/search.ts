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
            _id: "$_id",
            hotel_name: "$hotel_name",
            name: "$name",
            country: "$country",
          },
        },
      },
    },
  ]);

  const result = await data.toArray();

  res.send({
    cities: result.filter((i) => i._id === "cities")?.[0]?.data,
    countries: result.filter((i) => i._id === "countries")?.[0]?.data,
    hotels: result.filter((i) => i._id === "hotels")?.[0]?.data,
  });
});

export default searchRouter;
