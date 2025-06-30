import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="w-full bg-blue-300 flex flex-col gap-2 items-center justify-center p-4">
      <h1 className="text-2xl uppercase font-bold">Checkpoint : frontend</h1>
      <Link className="hover:text-blue-400 transition-all duration-150 " to="/">
        Countries
      </Link>
    </header>
  );
}
