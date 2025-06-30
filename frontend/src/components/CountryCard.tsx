import { Link } from "react-router-dom";
export function CountryCard({
  country,
}: {
  country: { name: string; emoji: string; code: string };
}) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4 border rounded-lg shadow-md bg-white">
      <h2>{country.name}</h2>
      <p>{country.emoji}</p>
      <p>{country.code}</p>
      <Link to={`/country/${country.code}`}>En savoir plus</Link>
    </div>
  );
}
