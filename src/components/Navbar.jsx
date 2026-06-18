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
    alignItems: "center",
    gap: "20px",
  }}
>
  <Link
    to="/"
    style={{
      textDecoration: "none",
      color: "white",
      fontWeight: "bold",
    }}
  >
    Home
  </Link>

  {isLoggedIn ? (
    <>
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </Link>

      <button
        onClick={() => {
          localStorage.removeItem(
            "isLoggedIn"
          );

          localStorage.removeItem(
            "currentUser"
          );

          window.location.reload();
        }}
        style={{
          background: "#ef4444",
          border: "none",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">
        <button
          style={{
            background: "transparent",
            border:
              "1px solid #60a5fa",
            color: "#60a5fa",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </Link>

      <Link to="/register">
        <button
          style={{
            background: "#2563eb",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register
        </button>
      </Link>
    </>
  )}
</div>
    </nav>
  );
}

export default Navbar;