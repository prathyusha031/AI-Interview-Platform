import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          color: "white",
          margin: 0,
        }}
      >
        AI Interview Platform
      </h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/mock"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Mock Interview
        </Link>

        <Link
          to="/resume"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Resume Interview
        </Link>

        <Link
          to="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;