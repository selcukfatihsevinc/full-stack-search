import { db } from "client/mongoClient";
import express, { Request, Response } from "express";

const countryRouter = express.Router();

countryRouter.get("/countries/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  res.send("countries");
});

export default countryRouter;
