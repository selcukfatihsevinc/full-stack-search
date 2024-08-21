import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import hotelRouter from "route/hotel";
import countryRouter from "route/country";
import cityRouter from "route/city";
import searchRouter from "route/search";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(hotelRouter);
app.use(countryRouter);
app.use(cityRouter);
app.use(searchRouter);

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
