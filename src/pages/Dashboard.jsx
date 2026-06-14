import { useEffect, useState } from "react";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("interviews")) || [];

    setHistory(data);
  }, []);

  const totalInterviews = history.length;

  const averageScore =
    totalInterviews > 0
      ? (
          history.reduce(
            (sum, item) => sum + item.score,
            0
          ) / totalInterviews
        ).toFixed(1)
      : 0;

  const bestScore =
    totalInterviews > 0
      ? Math.max(
          ...history.map((item) => item.score)
        )
      : 0;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Performance Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "200px",
          }}
        >
          <h3>Total Interviews</h3>
          <p>{totalInterviews}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "200px",
          }}
        >
          <h3>Average Score</h3>
          <p>{averageScore}/10</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            minWidth: "200px",
          }}
        >
          <h3>Best Score</h3>
          <p>{bestScore}/10</p>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Interview History
      </h2>

      {history.length > 0 ? (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <p>
              <strong>Role:</strong> {item.role}
            </p>

            <p>
              <strong>Date:</strong> {item.date}
            </p>

            <p>
              <strong>Score:</strong> {item.score}/10
            </p>

            <p>
              <strong>Question:</strong>{" "}
              {item.question}
            </p>
          </div>
        ))
      ) : (
        <p>No interviews yet.</p>
      )}
    </div>
  );
}

export default Dashboard;