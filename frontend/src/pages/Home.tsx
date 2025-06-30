import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CountryCard } from "../components/CountryCard";
import { CountryFormLabel } from "../components/CountryFormLabel";
import { ADD_COUNTRY } from "../requests/mutations/country.mutation";
import { GET_CONTINENTS } from "../requests/queries/continent.query";
import { GET_COUNTRIES } from "../requests/queries/countries.query";

type Country = {
  name: string;
  emoji: string;
  code: string;
};

type GetCountriesData = {
  countries: Country[];
};

type AddCountryInput = {
  code: string;
  name: string;
  emoji: string;
  continent: {
    id: number;
  };
};
type Continent = {
  name: string;
  id: number;
};

type getContinentsData = {
  continents: Continent[];
};

export function HomePage() {
  const [succesMessage, setSuccesMessage] = useState<string | null>(null);
  const { data, loading, error } = useQuery<GetCountriesData>(GET_COUNTRIES);

  const { data: continentData } = useQuery<getContinentsData>(GET_CONTINENTS);

  const [addCountry] = useMutation<AddCountryInput>(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
  });

  console.log(continentData);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const code = formData.get("code");
    const name = formData.get("name");
    const emoji = formData.get("emoji");
    const continent = formData.get("continent");
    try {
      await addCountry({
        variables: {
          data: {
            code,
            continent: {
              id: continent && parseInt(continent as string),
            },
            name,
            emoji,
          },
        },
        onCompleted: () => {
          setSuccesMessage("Country added successfully!");
          setTimeout(() => setSuccesMessage(null), 3000);
        },
      });
      console.log("Country added!");
      event.currentTarget.reset();
    } catch (err) {
      console.error("Failed to add country:", err);
    }
  };

  return (
    <section className="flex flex-col gap-4 p-4 items-center justify-center">
      <h1 className="text-xl">All countries</h1>

      <div className="flex flex-col gap-4 p-8 items-center justify-center border rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CountryFormLabel text="Code :" id="code" />
          <CountryFormLabel text="Name: " id="name" />
          <CountryFormLabel text="Emoji :" id="emoji" />

          <div className="flex flex-col gap-2 items-start justify-start">
            <label htmlFor="continent">Continent :</label>
            <select
              name="continent"
              id="continent"
              required
              className="border p-2 w-full rounded-md"
            >
              {continentData &&
                continentData.continents.map((continent) => (
                  <option key={continent.id} value={continent.id}>
                    {continent.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-300 hover:bg-blue-400 text-white transition-all duration-150 rounded-md"
          >
            Submit
          </button>
          {succesMessage && (
            <p className="p-2 bg-green-500 text-center w-full text-white rounded-md">
              {succesMessage}
            </p>
          )}
        </form>
      </div>

      <div className="countries-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {data.countries.map((country: Country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
