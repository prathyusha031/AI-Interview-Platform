import { useState } from "react";
import {
  generateQuestions,
  evaluateAnswer,
} from "../services/gemini";

function Interview() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (topic) => {
    setLoading(true);
    setFeedback("");
    setAnswer("");

    try {
      const result = await generateQuestions(topic);
      setQuestion(result);
    } catch (error) {
      console.error(error);
      setQuestion("Failed to generate question.");
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
      const result = await evaluateAnswer(
        question,
        answer
      );

      setFeedback(result);

      const scoreMatch =
        result.match(/Score:\s*(\d+)\/10/i);

      const score = scoreMatch
        ? scoreMatch[1]
        : "0";

      const history =
        JSON.parse(
          localStorage.getItem("interviews")
        ) || [];

      history.push({
        role: question,
        score: Number(score),
        date: new Date().toLocaleDateString(),
      });

      localStorage.setItem(
        "interviews",
        JSON.stringify(history)
      );
    } catch (error) {
      console.error(error);
      setFeedback("Failed to evaluate answer.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Interview Coach</h1>

      <h3>Select Interview Type</h3>

      <button onClick={() => handleGenerate("Python")}>
        Python
      </button>

      <button
        onClick={() => handleGenerate("Java")}
        style={{ marginLeft: "10px" }}
      >
        Java
      </button>

      <button
        onClick={() => handleGenerate("Data Science")}
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

      {loading && <p>Loading...</p>}

      {question && (
        <div style={{ marginTop: "30px" }}>
          <h3>Question</h3>

          <p>{question}</p>

          <textarea
            rows="6"
            cols="70"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
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

          <pre>{feedback}</pre>
        </div>
      )}
    </div>
  );
}

export default Interview;