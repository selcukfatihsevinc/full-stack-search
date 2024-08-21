import { MongoClient } from "mongodb";

if (process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL) {
  await import("../db/startAndSeedMemoryDB");
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const DATABASE_URL = process.env.DATABASE_URL;

const mongoClient = async () => {
  const client = new MongoClient(DATABASE_URL);
  await client.connect();
  const db = client.db();
  return db;
};

export const db = await mongoClient();
