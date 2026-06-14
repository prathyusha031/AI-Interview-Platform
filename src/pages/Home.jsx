import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 50px",
          background: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>AI Interview Prep</h2>

        <div>
          <Link
            to="/"
            style={{ marginRight: "20px", textDecoration: "none" }}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            style={{ textDecoration: "none" }}
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <div
        style={{
          textAlign: "center",
          paddingTop: "120px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
          }}
        >
          AI Interview Preparation Platform
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "40px",
          }}
        >
          Practice technical and HR interviews with AI-powered feedback.
        </p>

        <Link to="/interview">
          <button
            style={{
              padding: "15px 30px",
              fontSize: "18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Start Interview
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;