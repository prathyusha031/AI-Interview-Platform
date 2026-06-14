import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>AI Interview Coach</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/interview">Interview</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;