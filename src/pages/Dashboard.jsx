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
    history.length > 0
      ? (
          history.reduce(
            (sum, item) => sum + item.score,
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((item) => item.score))
      : 0;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Performance Dashboard</h1>

      <h2>Total Interviews: {totalInterviews}</h2>

      <h2>Average Score: {averageScore}/10</h2>

      <h2>Best Score: {bestScore}/10</h2>

      <hr />

      <h2>Interview History</h2>

      {history.length === 0 ? (
        <p>No interviews yet.</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Date:</strong> {item.date}
            </p>

            <p>
              <strong>Score:</strong> {item.score}/10
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;