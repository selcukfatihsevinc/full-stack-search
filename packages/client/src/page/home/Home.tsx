import { useState, type ChangeEvent } from "react";
import debounce from "lodash/debounce";
import { getCodeSandboxHost } from "@codesandbox/utils";

export type SearchResponse = {
  cities: [{ _id: string; name: string }];
  countries: [{ _id: string; country: string }];
  hotels: [{ _id: string; hotel_name: string; country: string }];
};

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : "http://localhost:3001";

const fetchSearch = async (value: string) => {
  const searchData = await fetch(`${API_URL}/search?q=${value}`);
  const data = (await searchData.json()) as SearchResponse;
  return data;
};

function Home() {
  const [searchData, setSearchData] = useState<SearchResponse | null>();
  const [showClearBtn, setShowClearBtn] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 3) {
      setSearchData(null);
      setShowClearBtn(false);
      return;
    }

    const data = await fetchSearch(event.target.value);
    setShowClearBtn(true);
    setSearchData(data);
  };

  const fetchDebounced = debounce(fetchData, 300, {
    maxWait: 1000,
  });

  const hotels = searchData?.hotels;
  const countries = searchData?.countries;
  const cities = searchData?.cities;

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={fetchDebounced}
                />
                {showClearBtn && (
                  <span className="left-pan">
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {!!hotels?.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {hotels.length ? (
                    hotels.map((hotel, index) => (
                      <li key={index}>
                        <a
                          href={`/hotels/${hotel._id}`}
                          className="dropdown-item"
                        >
                          <i className="fa fa-building mr-2"></i>
                          {hotel.hotel_name}
                        </a>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No hotels matched</p>
                  )}

                  <h2>Countries</h2>
                  {countries?.length ? (
                    countries.map((country, index) => (
                      <li key={index}>
                        <a
                          href={`/countries/${country._id}`}
                          className="dropdown-item"
                        >
                          <i className="fa fa-building mr-2"></i>
                          {country.country}
                        </a>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No countries matched</p>
                  )}

                  <h2>Cities</h2>
                  {cities?.length ? (
                    cities.map((city, index) => (
                      <li key={index}>
                        <a
                          href={`/cities/${city._id}`}
                          className="dropdown-item"
                        >
                          <i className="fa fa-building mr-2"></i>
                          {city.name}
                        </a>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No countries matched</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
