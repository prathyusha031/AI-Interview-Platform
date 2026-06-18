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
          fontSize: "24px",
        }}
      >
        AI Interview Platform
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
          }}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "8px 16px",
            border: "1px solid #38bdf8",
            borderRadius: "8px",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            background: "#38bdf8",
            color: "white",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;