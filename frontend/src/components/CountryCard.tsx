import { Link } from "react-router-dom";
export function CountryCard({
  country,
}: {
  country: { name: string; emoji: string; code: string };
}) {
  return (
    <div className="country_card">
      <h2>{country.name}</h2>
      <p>{country.emoji}</p>
      <p>{country.code}</p>
      <Link to={`/country/${country.code}`}>En savoir plus</Link>
    </div>
  );
}
