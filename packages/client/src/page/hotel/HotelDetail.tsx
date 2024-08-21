import { getCodeSandboxHost } from "@codesandbox/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchResponse } from "../home/Home";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

type HotelResponse = SearchResponse["hotels"][0];

const fetchHotel = async (value: string) => {
  const hotelData = await fetch(`${API_URL}/hotels/${value}`);
  const data = (await hotelData.json()) as HotelResponse;
  return data;
};

function HotelDetail() {
  const { id } = useParams();
  const [data, setData] = useState<HotelResponse | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchHotel(id);
        setData(data);
      };

      fetchData();
    }
  }, [id]);

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6 text-white">{data?.hotel_name}</div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetail;
