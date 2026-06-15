import { useState } from "react";
import {
  generateQuestions,
  evaluateAnswer,
} from "../services/gemini";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const handleGenerate = async (topic) => {
    setLoading(true);

    setSelectedRole(topic);
    setFeedback("");
    setAnswer("");
    setCurrentIndex(0);

    try {
      const result = await generateQuestions(
        topic,
        difficulty
      );

      const parsedQuestions = result
        .split("\n")
        .filter(
          (line) =>
            line.trim() &&
            /^\d+\./.test(line.trim())
        );

      setQuestions(parsedQuestions);
    } catch (error) {
      console.error(error);
      setQuestions([
        "Failed to generate questions.",
      ]);
    }

    setLoading(false);
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) {
      alert("Please enter an answer");
      return;
    }

    setLoading(true);

    try {
      const currentQuestion =
        questions[currentIndex];

      const result = await evaluateAnswer(
        currentQuestion,
        answer
      );

      setFeedback(result);

      const scoreMatch =
        result.match(/Score:\s*(\d+)\/10/i);

      const score = scoreMatch
        ? Number(scoreMatch[1])
        : 0;

      const history =
        JSON.parse(
          localStorage.getItem("interviews")
        ) || [];

      history.push({
        role: selectedRole,
        difficulty,
        question: currentQuestion,
        score,
        date: new Date().toLocaleDateString(),
      });

      localStorage.setItem(
        "interviews",
        JSON.stringify(history)
      );
    } catch (error) {
      console.error(error);
      setFeedback(
        "Failed to evaluate answer."
      );
    }

    setLoading(false);
  };

  const handleNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    setAnswer("");
    setFeedback("");
  };

  const currentQuestion =
    questions[currentIndex];

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
      }}
    >
      <h1>AI Interview Coach</h1>

      <h3>Select Difficulty</h3>

      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
        style={{
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <h3>Select Interview Type</h3>

      <button
        onClick={() => handleGenerate("Python")}
      >
        Python
      </button>

      <button
        onClick={() => handleGenerate("Java")}
        style={{ marginLeft: "10px" }}
      >
        Java
      </button>

      <button
        onClick={() =>
          handleGenerate("Data Science")
        }
        style={{ marginLeft: "10px" }}
      >
        Data Science
      </button>

      <button
        onClick={() => handleGenerate("HR")}
        style={{ marginLeft: "10px" }}
      >
        HR
      </button>

      {selectedRole && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Role:</strong>{" "}
            {selectedRole}
          </p>

          <p>
            <strong>Difficulty:</strong>{" "}
            {difficulty}
          </p>
        </div>
      )}

      {loading && (
        <p style={{ marginTop: "20px" }}>
          Loading...
        </p>
      )}

      {currentQuestion && (
        <div style={{ marginTop: "30px" }}>
          <h3>
            Question {currentIndex + 1} of{" "}
            {questions.length}
          </h3>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            {currentQuestion}
          </p>

          <textarea
            rows="8"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            style={{
              width: "100%",
              maxWidth: "800px",
              padding: "12px",
              borderRadius: "10px",
            }}
          />

          <br />
          <br />

          <button onClick={handleEvaluate}>
            Evaluate Answer
          </button>
        </div>
      )}

      {feedback && (
        <div style={{ marginTop: "30px" }}>
          <h3>AI Feedback</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              color: "white",
            }}
          >
            {feedback}
          </pre>

          {currentIndex <
            questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              style={{
                marginTop: "15px",
              }}
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Interview;