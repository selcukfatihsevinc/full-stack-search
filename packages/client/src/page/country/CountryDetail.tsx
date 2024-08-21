import { useEffect, useState } from "react";
import { getCodeSandboxHost } from "@codesandbox/utils";
import { SearchResponse } from "../home/Home";
import { useParams } from "react-router-dom";

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

type CountryResponse = SearchResponse["countries"][0];

const fetchCountry = async (value: string) => {
  const countryData = await fetch(`${API_URL}/countries/${value}`);
  const data = (await countryData.json()) as CountryResponse;
  return data;
};

function CountryDetail() {
  const { id } = useParams();
  const [data, setData] = useState<CountryResponse | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await fetchCountry(id);
        setData(data);
      };

      fetchData();
    }
  }, [id]);

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6 text-white">{data?.country}</div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
