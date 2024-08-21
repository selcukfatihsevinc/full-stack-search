import { Routes, Route } from "react-router-dom";
import Home from "./page/home/Home";
import HotelDetail from "./page/hotel/HotelDetail";
import CountryDetail from "./page/country/CountryDetail";
import CityDetail from "./page/city/CityDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/hotels/:id" Component={HotelDetail} />
      <Route path="/countries/:id" Component={CountryDetail} />
      <Route path="/cities/:id" Component={CityDetail} />
      <Route path="/" Component={Home} />
    </Routes>
  );
};

export default Router;
