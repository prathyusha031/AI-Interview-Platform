import { Link } from "react-router-dom";

function Base() {
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
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#60a5fa",
            fontWeight: "700",
          }}
        >
          AI Interview Platform
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <Link to="/login">
            <button
              style={{
                background: "transparent",
                border: "1px solid #60a5fa",
                color: "#60a5fa",
                padding: "10px 22px",
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
                padding: "10px 22px",
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
          paddingTop: "100px",
          maxWidth: "1000px",
          margin: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            background: "rgba(96,165,250,0.15)",
            color: "#60a5fa",
            padding: "10px 20px",
            borderRadius: "999px",
            fontWeight: "bold",
            marginBottom: "30px",
          }}
        >
          🚀 AI-Powered Interview Preparation
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "64px",
            lineHeight: "1.2",
            marginBottom: "25px",
            fontWeight: "800",
          }}
        >
          Prepare Smarter.
          <br />
          Interview Better.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "22px",
            color: "#cbd5e1",
            lineHeight: "1.8",
            maxWidth: "850px",
            margin: "auto",
          }}
        >
          Practice real technical and HR interviews, receive
          instant AI-powered feedback, improve your confidence,
          and track your performance through detailed analytics
          and personalized insights.
        </p>

        {/* CTA Button */}
        <Link to="/login">
          <button
            style={{
              marginTop: "45px",
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "18px 42px",
              borderRadius: "12px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow:
                "0 10px 25px rgba(37,99,235,0.4)",
            }}
          >
            Get Started →
          </button>
        </Link>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "80px",
            marginTop: "90px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                color: "#60a5fa",
                fontSize: "40px",
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
                fontSize: "40px",
              }}
            >
              AI
            </h2>
            <p>Powered Feedback</p>
          </div>

          <div>
            <h2
              style={{
                color: "#60a5fa",
                fontSize: "40px",
              }}
            >
              24/7
            </h2>
            <p>Practice Anytime</p>
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "90px",
            paddingBottom: "80px",
          }}
        >
          <div
            style={{
              width: "250px",
              background: "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>🤖 AI Interview Questions</h3>
            <p>
              Dynamic interview questions generated
              using advanced AI models.
            </p>
          </div>

          <div
            style={{
              width: "250px",
              background: "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>📊 Smart Feedback</h3>
            <p>
              Receive instant scores, strengths,
              weaknesses and improvement suggestions.
            </p>
          </div>

          <div
            style={{
              width: "250px",
              background: "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h3>🏆 Performance Analytics</h3>
            <p>
              Track progress, monitor scores and
              measure interview readiness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base;