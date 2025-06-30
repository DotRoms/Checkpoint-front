import { useMutation, useQuery } from "@apollo/client";
import { CountryCard } from "../components/CountryCard";
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
    console.log("Form data:", { code, name, emoji, continent });
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
      });
      console.log("Country added!");
      event.currentTarget.reset();
    } catch (err) {
      console.error("Failed to add country:", err);
    }
  };

  return (
    <section className="bg-blue-100">
      <h1>Countries</h1>

      <div>
        <p>Add country</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="code">code :</label>
          <input type="text" name="code" id="code" required />

          <label htmlFor="name">Name :</label>
          <input type="text" name="name" id="name" required />

          <label htmlFor="emoji">Emoji :</label>
          <input type="text" name="emoji" id="emoji" required />

          <label htmlFor="continent">Continent :</label>
          <select name="continent" id="continent" required>
            {continentData &&
              continentData.continents.map((continent) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="countries-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div className="countries-list">
            {data.countries.map((country: Country) => (
              <CountryCard key={country.code} country={country} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
