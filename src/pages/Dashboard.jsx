import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [history, setHistory] =
    useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem(
          "interviews"
        )
      ) || [];

    setHistory(data);
  }, []);

  const totalInterviews =
    history.length;

  const averageScore =
    totalInterviews > 0
      ? (
          history.reduce(
            (sum, item) =>
              sum + item.score,
            0
          ) / totalInterviews
        ).toFixed(1)
      : 0;

  const bestScore =
    totalInterviews > 0
      ? Math.max(
          ...history.map(
            (item) => item.score
          )
        )
      : 0;

  const latestInterview =
    history.length > 0
      ? history[
          history.length - 1
        ]
      : null;

  const chartData = history.map(
    (item, index) => ({
      attempt: `#${index + 1}`,
      score: item.score,
    })
  );

  const getScoreColor = (
    score
  ) => {
    if (score >= 8)
      return "#22c55e";

    if (score >= 6)
      return "#f59e0b";

    return "#ef4444";
  };

  return (
<>
  <Navbar />

  <div
      style={{
        padding: "40px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>
        📊 Performance Dashboard
      </h1>

      {/* Statistics */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background:
              "#1e293b",
            padding: "20px",
            borderRadius:
              "12px",
            minWidth: "220px",
          }}
        >
          <h3>
            Total Interviews
          </h3>
          <h2>
            {
              totalInterviews
            }
          </h2>
        </div>

        <div
          style={{
            background:
              "#1e293b",
            padding: "20px",
            borderRadius:
              "12px",
            minWidth: "220px",
          }}
        >
          <h3>
            Average Score
          </h3>
          <h2>
            {averageScore}/10
          </h2>
        </div>

        <div
          style={{
            background:
              "#1e293b",
            padding: "20px",
            borderRadius:
              "12px",
            minWidth: "220px",
          }}
        >
          <h3>Best Score</h3>
          <h2>
            {bestScore}/10
          </h2>
        </div>
      </div>

      {/* Latest Interview */}

      {latestInterview && (
        <div
          style={{
            background:
              "#1e293b",
            marginTop: "30px",
            padding: "20px",
            borderRadius:
              "12px",
          }}
        >
          <h2>
            🎯 Latest Interview
          </h2>

          <p>
            <strong>
              Date:
            </strong>{" "}
            {
              latestInterview.date
            }
          </p>

          <p>
            <strong>
              Questions:
            </strong>{" "}
            {
              latestInterview.questionsCount
            }
          </p>

          <h3
            style={{
              color:
                getScoreColor(
                  latestInterview.score
                ),
            }}
          >
            Score:{" "}
            {
              latestInterview.score
            }
            /10
          </h3>
        </div>
      )}

      {/* Chart */}

      <div
        style={{
          background:
            "#1e293b",
          marginTop: "40px",
          padding: "20px",
          borderRadius:
            "12px",
        }}
      >
        <h2>
          📈 Score Progress
        </h2>

        {chartData.length >
        0 ? (
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart
              data={
                chartData
              }
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="attempt" />

              <YAxis
                domain={[
                  0, 10,
                ]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#38bdf8"
                strokeWidth={
                  3
                }
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>
            No interview
            history
            available.
          </p>
        )}
      </div>

      {/* History */}

      <div
        style={{
          marginTop: "40px",
          background:
            "#1e293b",
          padding: "20px",
          borderRadius:
            "12px",
        }}
      >
        <h2>
          Interview History
        </h2>

        {history.length ===
        0 ? (
          <p>
            No interviews
            found.
          </p>
        ) : (
          history.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                style={{
                  background:
                    "#334155",
                  padding:
                    "20px",
                  borderRadius:
                    "10px",
                  marginTop:
                    "20px",
                }}
              >
                <h3>
                  Attempt #
                  {index + 1}
                </h3>

                <p>
                  <strong>
                    Date:
                  </strong>{" "}
                  {
                    item.date
                  }
                </p>

                <p>
                  <strong>
                    Questions:
                  </strong>{" "}
                  {
                    item.questionsCount
                  }
                </p>

                <h3
                  style={{
                    color:
                      getScoreColor(
                        item.score
                      ),
                  }}
                >
                  {
                    item.score
                  }
                  /10
                </h3>

                <details
  style={{
    marginTop: "10px",
  }}
>
  <summary
    style={{
      cursor: "pointer",
    }}
  >
    View Full Report
  </summary>

  <div
    style={{
      marginTop: "15px",
    }}
  >
    {Array.isArray(item.report) ? (
      item.report.map(
        (q, reportIndex) => (
          <div
            key={reportIndex}
            style={{
              background:
                "#1e293b",
              padding: "15px",
              borderRadius:
                "10px",
              marginBottom:
                "15px",
            }}
          >
            <h4>
              Question{" "}
              {reportIndex + 1}
            </h4>

            <p>
              <strong>
                Question:
              </strong>
            </p>

            <p>
              {q.question}
            </p>

            <p>
              <strong>
                Answer:
              </strong>
            </p>

            <p>
              {q.answer}
            </p>

            <p>
              <strong>
                Score:
              </strong>{" "}
              {q.score}/10
            </p>

            <p>
              <strong>
                Feedback:
              </strong>
            </p>

            <pre
              style={{
                whiteSpace:
                  "pre-wrap",
                lineHeight:
                  "1.6",
                color:
                  "#e2e8f0",
              }}
            >
              {q.feedback}
            </pre>
          </div>
        )
      )
    ) : (
      <pre
        style={{
          whiteSpace:
            "pre-wrap",
          marginTop:
            "10px",
          lineHeight:
            "1.7",
        }}
      >
        {item.report}
      </pre>
    )}
  </div>
</details>
              </div>
            )
          )
        )}
      </div>
    </div>
</>
);
}

export default Dashboard;
