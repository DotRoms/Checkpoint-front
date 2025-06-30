import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../requests/queries/countries.query";

type Country = {
  name: string;
  emoji: string;
  code: string;
  continent: Continent;
  id: string;
};

type Continent = {
  name: string;
};

type GetCountryData = {
  country: Country;
};

export function CountryPage() {
  const { code } = useParams<{ code: string }>();

  const { data, loading, error } = useQuery<GetCountryData>(GET_COUNTRY, {
    variables: { code },
  });

  console.log("CountryPage data:", data);
  return (
    <section className="country_card">
      <p>Information for code : {code}</p>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <p>Name : {data.country.name}</p>
            <p>Code : {data.country.code}</p>
            <p>Emoji : {data.country.emoji}</p>
            <div>
              <p>
                Continent :{" "}
                {data.country.continent
                  ? data.country.continent.name
                  : "Not found"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
