import { db } from "client/mongoClient";
import express, { Request, Response } from "express";

const cityRouter = express.Router();

cityRouter.get("/cities/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  res.send("cities");
});

export default cityRouter;
