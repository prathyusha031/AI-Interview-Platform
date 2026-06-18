import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Login successful");

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#1e293b",
          padding: "40px",
          borderRadius: "15px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          Login to continue your interview preparation
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={buttonStyle}
        >
          Login
        </button>

        <p
          style={{
            color: "#cbd5e1",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#38bdf8",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "14px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Login;