import { useEffect, useState } from "react";
import { getCodeSandboxHost } from "@codesandbox/utils";
import { SearchResponse } from "../home/Home";
import { useParams } from "react-router-dom";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

type CityResponse = SearchResponse["cities"][0];

const fetchCity = async (value: string) => {
  const cityData = await fetch(`${API_URL}/cities/${value}`);
  const data = (await cityData.json()) as CityResponse;
  return data;
};

function CityDetail() {
  const { id } = useParams();
  const [data, setData] = useState<CityResponse | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchCity(id);
        setData(data);
      };

      fetchData();
    }
  }, [id]);

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6 text-white">{data?.name}</div>
        </div>
      </div>
    </div>
  );
}

export default CityDetail;
