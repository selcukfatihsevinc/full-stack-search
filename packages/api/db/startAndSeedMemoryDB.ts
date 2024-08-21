import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import uniq from "lodash/uniq";
import { cities } from "db/seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";
import { Tokenizer } from "utils/tokenizer";

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 3002,
  },
});
console.log("MongoMemoryServer started on", mongod.getUri());

const uri = mongod.getUri();

process.env.DATABASE_URL = uri;

const client = new MongoClient(uri);
const tokenizer = Tokenizer(3, 20);

try {
  await client.connect();
  const db = client.db();

  const getTokenizedCities = cities.map((city) => {
    city.token = uniq(tokenizer(city.name));
    return city;
  });

  const getTokenizedCountries = countries.map((country) => {
    country.token = uniq(tokenizer(country.country));
    return country;
  });

  const getTokenizedHotels = hotels.map((hotel) => {
    const name = tokenizer(hotel.hotel_name);
    const country = tokenizer(hotel.country);
    const city = tokenizer(hotel.city);
    const token = name.concat(country, city);
    hotel.token = uniq(token);
    return hotel;
  });

  // add indexes for token field
  await db.collection("cities").createIndex({ token: 1 });
  await db.collection("countries").createIndex({ token: 1 });
  await db.collection("hotels").createIndex({ token: 1 });

  // seed db
  await db.collection("cities").insertMany(getTokenizedCities);
  await db.collection("countries").insertMany(getTokenizedCountries);
  await db.collection("hotels").insertMany(getTokenizedHotels);
} catch (error) {
  console.error("Error seeding database:", error);
} finally {
  await client.close();
}

process.on("SIGTERM", async () => {
  await mongod.stop();
  process.exit(0);
});
