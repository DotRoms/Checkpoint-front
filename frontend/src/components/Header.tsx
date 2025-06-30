import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header bg-red-500">
      <h1>Checkpoint : frontend</h1>
      <Link to="/">Countries</Link>
    </header>
  );
}
