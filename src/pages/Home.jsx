import { Link } from "react-router-dom";

const isLoggedIn =
  localStorage.getItem("isLoggedIn");

const currentUser =
  JSON.parse(
    localStorage.getItem(
      "currentUser"
    )
  );

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#60a5fa",
          }}
        >
          AI Interview Coach
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

          <Link to="/login">
  <button
    style={{
      background: "transparent",
      border: "1px solid #60a5fa",
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
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "120px",
          maxWidth: "1000px",
          margin: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >

      {isLoggedIn &&
  currentUser && (
    <h3
      style={{
        color: "#60a5fa",
        marginBottom: "20px",
      }}
    >
      Welcome Back,
      {" "}
      {currentUser.name}
      👋
    </h3>
)}
        <h1
          style={{
            fontSize: "64px",
            lineHeight: "1.1",
            marginBottom: "25px",
            fontWeight: "800",
          }}
        >
          Crack Your Next
          <br />
          Technical Interview
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#cbd5e1",
            maxWidth: "800px",
            margin: "auto",
            marginBottom: "50px",
          }}
        >
          Practice Python, Java, Data Science and HR
          interviews with AI-generated questions,
          intelligent feedback, resume-based assessments,
          performance analytics and downloadable reports.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link
  to={
    isLoggedIn
      ? "/interview"
      : "/login"
  }
>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                padding: "16px 35px",
                fontSize: "18px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow:
                  "0 10px 25px rgba(37,99,235,0.4)",
              }}
            >
              Start Interview →
            </button>
          </Link>

          <Link
  to={
    isLoggedIn
      ? "/resume-interview"
      : "/login"
  }
>
            <button
              style={{
                background: "#16a34a",
                color: "white",
                padding: "16px 35px",
                fontSize: "18px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow:
                  "0 10px 25px rgba(22,163,74,0.4)",
              }}
            >
              Upload Resume →
            </button>
          </Link>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "70px",
            marginTop: "80px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                color: "#60a5fa",
                fontSize: "36px",
              }}
            >
              100+
            </h2>
            <p>Interview Questions</p>
          </div>

          <div>
            <h2
              style={{
                color: "#60a5fa",
                fontSize: "36px",
              }}
            >
              4
            </h2>
            <p>Interview Domains</p>
          </div>

          <div>
            <h2
              style={{
                color: "#60a5fa",
                fontSize: "36px",
              }}
            >
              AI
            </h2>
            <p>Powered Evaluation</p>
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "90px",
            flexWrap: "wrap",
            paddingBottom: "80px",
          }}
        >
          
          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>🤖 AI Questions</h3>
            <p>
              Dynamic interview questions generated
              by Gemini AI.
            </p>
          </div>

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>📊 Smart Feedback</h3>
            <p>
              Get scores, strengths, weaknesses and
              improvement suggestions.
            </p>
          </div>

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>🏆 Performance Tracking</h3>
            <p>
              Monitor your interview progress through
              detailed analytics.
            </p>
          </div>

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
              width: "220px",
            }}
          >
            <h3>📄 PDF Reports</h3>
            <p>
              Download complete interview assessment
              reports instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;