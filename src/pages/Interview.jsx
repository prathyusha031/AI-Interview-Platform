import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  generateQuestions,
  evaluateAnswer,
} from "../services/gemini";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] =
    useState("");
  
  const [scores, setScores] = useState([]);

  const [reportData, setReportData] = useState([]);

  const [timeLeft, setTimeLeft] = useState(120);
  const [timerRunning, setTimerRunning] =
    useState(false);

  useEffect(() => {
    let timer;

    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
       setTimeLeft((prev) => prev - 1);
     }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

    useEffect(() => {
      if (timeLeft === 0) {
        setTimerRunning(false);

       if (answer.trim()) {
         handleEvaluate();
       } else {
         setFeedback(
          "⏰ Time is up! No answer was submitted."
        );
      }
    }
  }, [timeLeft]);

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [interviewCompleted, setInterviewCompleted] =
    useState(false);

  const handleGenerate = async (topic) => {
    setLoading(true);

    setSelectedRole(topic);
    setFeedback("");
    setAnswer("");
    setCurrentIndex(0);
    setTimeLeft(120);
    setTimerRunning(true);
    setInterviewCompleted(false);
    setScores([]);
    setReportData([]);

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

  alert(
    "Failed to generate interview questions."
  );

  setQuestions([]);
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
      setTimerRunning(false);

      const scoreMatch =
        result.match(/Score:\s*(\d+)\/10/i);

      const score = scoreMatch
        ? Number(scoreMatch[1])
        : 0;

      setScores((prev) => [...prev, score]);

      setReportData((prev) => [
        ...prev,
        {
           question: currentQuestion,
           answer,
           score,
           feedback: result,
        },
      ]);

    } catch (error) {
      console.error(error);

      setFeedback(
        "Failed to evaluate answer."
      );
    }

    setLoading(false);
  };

  const handleNextQuestion = () => {
  if (
    currentIndex ===
    questions.length - 1
  ) {
    const allScores = [
  ...scores,
];

const finalScore =
  allScores.length > 0
        ? Number(
            (
              allScores.reduce(
                (a, b) => a + b,
                0
              ) / scores.length
            ).toFixed(1)
          )
        : 0;

    const history =
      JSON.parse(
        localStorage.getItem(
          "interviews"
        )
      ) || [];

    history.push({
      date: new Date().toLocaleString(),
      role: selectedRole,
      difficulty,
      score: finalScore,
      questionsCount:
        questions.length,

      report: reportData,
    });

    localStorage.setItem(
      "interviews",
      JSON.stringify(history)
    );

    setTimerRunning(false);
    setInterviewCompleted(true);

    return;
  }

  setTimeLeft(120);
  setTimerRunning(true);
  setCurrentIndex(
    (prev) => prev + 1
  );
  setAnswer("");
  setFeedback("");
};

const currentQuestion =
  questions[currentIndex];

const averageScore =
  scores.length > 0
    ? (
        scores.reduce(
          (a, b) => a + b,
          0
        ) / scores.length
      ).toFixed(1)
    : 0;

let badge = "Beginner";

if (Number(averageScore) >= 9) {
  badge = "Advanced";
} else if (
  Number(averageScore) >= 7
) {
  badge = "Intermediate";
}
  
    const downloadReport = () => {
      const doc = new jsPDF();

        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 30, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("AI Interview Assessment Report", 20, 20);

        doc.setTextColor(0, 0, 0);

        doc.setFontSize(12);

        doc.text(`Role: ${selectedRole}`, 20, 45);
        doc.text(`Difficulty: ${difficulty}`, 20, 55);
        doc.text(`Questions Attempted: ${questions.length}`, 20, 65);
        doc.text(`Average Score: ${averageScore}/10`, 20, 75);
        doc.text(`Skill Badge: ${badge}`, 20, 85);
        doc.text(
          `Generated On: ${new Date().toLocaleDateString()}`,
           20,
           95
        );

        let y = 120;

        doc.setFontSize(14);
        doc.text("Questions", 20, y);

        doc.setFontSize(11);

        reportData.forEach((item, index) => {

          if (y > 220) {
           doc.addPage();
           y = 20;
          }

          doc.setFontSize(13);
          doc.text(`Question ${index + 1}`, 20, y);

          y += 8;

        const questionText = doc.splitTextToSize(
            item.question,
            170
        );

        doc.text(questionText, 20, y);

        y += questionText.length * 6 + 5;

        doc.setFontSize(11);

        const answerText = doc.splitTextToSize(
           item.answer,
           170
        );

        const feedbackText = doc.splitTextToSize(
           item.feedback,
           170
        );

        const estimatedHeight =
           questionText.length * 6 +
           answerText.length * 6 +
           feedbackText.length * 6 +
           50;

        if (y + estimatedHeight > 270) {
           doc.addPage();
           y = 20;
        }

        doc.text("Candidate Answer:", 20, y);

       y += 6;

       doc.text(answerText, 25, y);

       y += answerText.length * 6 + 5;

        doc.text(
         `Score: ${item.score}/10`,
          20,
          y
        );

        y += 8;

        doc.text(
          "AI Feedback:",
           20,
           y
        );

        y += 6;

        doc.text(
          feedbackText,
          25,
          y
        );

        y += feedbackText.length * 6 + 15;
      });
        
       if (y > 240) {
  doc.addPage();
} else {
  y += 20;
}

doc.setFontSize(18);
doc.text(
  "Performance Summary",
  20,
  y
);

y += 20;

        doc.setFontSize(12);

        doc.text(
  `Average Score: ${averageScore}/10`,
  20,
  y
);

y += 10;

        doc.text(
  `Skill Level: ${badge}`,
  20,
  y
);

y += 20;

        if (Number(averageScore) >= 8) {
          doc.text(
            "Excellent performance. Ready for interviews.",
             20,
             70
        );
      } else if (Number(averageScore) >= 5) {
        doc.text(
          "Good understanding. More practice recommended.",
           20,
           70
        );
      } else {
        doc.text(
          "Needs improvement. Continue practicing.",
           20,
           70
       );
      }

      const pageCount = doc.internal.getNumberOfPages();

      for (let i = 1; i <= pageCount; i++) {

        doc.setPage(i);

        doc.setFontSize(10);

        doc.text(
          `Page ${i} of ${pageCount}`,
           170,
           290
        );
      }

        doc.save(
         `${selectedRole}-Interview-Report.pdf`
        );
      };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>AI Interview Coach</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h3>Select Difficulty</h3>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
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
          onClick={() =>
            handleGenerate("Python")
          }
          disabled={loading}
        >
          Python
        </button>

        <button
          onClick={() =>
            handleGenerate("Java")
          }
          disabled={loading}
          style={{
            marginLeft: "10px",
          }}
        >
          Java
        </button>

        <button
          onClick={() =>
            handleGenerate(
              "Data Science"
            )
          }
          disabled={loading}
          style={{
            marginLeft: "10px",
          }}
        >
          Data Science
        </button>

        <button
          onClick={() =>
            handleGenerate("HR")
          }
          disabled={loading}
          style={{
            marginLeft: "10px",
          }}
        >
          HR
        </button>
      </div>

      {selectedRole && (
        <div
          style={{
            marginTop: "20px",
            background: "#1e293b",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <p>
            <strong>Role:</strong>{" "}
            {selectedRole}
          </p>

          <p>
            <strong>
              Difficulty:
            </strong>{" "}
            {difficulty}
          </p>

          <p>
            <strong>Progress:</strong>{" "}
            {currentIndex + 1}/
            {questions.length}
          </p>
        </div>
      )}

      {loading && (
        <h3 style={{ marginTop: "20px" }}>
          Loading...
        </h3>
      )}

      {currentQuestion &&
        !interviewCompleted && (
          <div
            style={{
              marginTop: "30px",
              background:
                "#1e293b",
              padding: "25px",
              borderRadius: "12px",
            }}
          >
          
          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              background: "#334155",
              height: "12px",
              borderRadius: "10px",
              marginBottom: "15px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${
                 ((currentIndex + 1) /
                  questions.length) *
                 100
                }%`,
                height: "100%",
                background: "#22c55e",
                transition: "0.4s ease",
            }}
          />
        </div>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "20px",
          }}
        >
          Progress: {currentIndex + 1} / {questions.length}
        </p>

        <h2
          style={{
          marginBottom: "15px",
         }}
        >
          Question {currentIndex + 1} of{" "}
          {questions.length}
        </h2>

        <div
          style={{
            background:
          timeLeft <= 30
            ? "#dc2626"
            : "#2563eb",
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "bold",
              fontSize: "16px",
          }}
>
            ⏱ Time Left: {timeLeft}s
        </div>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            >
              {currentQuestion}
            </p>

            <textarea
              rows="8"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) =>
                setAnswer(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius:
                  "10px",
                marginTop: "20px",
              }}
            />

            <br />
            <br />

            <button
              onClick={
                handleEvaluate
              }
            >
              Evaluate Answer
            </button>
          </div>
        )}

      {feedback && (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h2>AI Feedback</h2>

          <pre
            style={{
              whiteSpace:
                "pre-wrap",
              background:
                "#1e293b",
              padding: "20px",
              borderRadius:
                "12px",
              color: "white",
            }}
          >
            {feedback}
          </pre>

          <button
            onClick={
              handleNextQuestion
            }
            style={{
              marginTop: "15px",
            }}
          >
            {currentIndex ===
            questions.length - 1
              ? "Finish Interview"
              : "Next Question"}
          </button>
        </div>
      )}

      {interviewCompleted && (
        <div
          style={{
            marginTop: "40px",
            background: "#16a34a",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h2>🎉 Interview Completed</h2>

          <p>
            Questions Attempted: {questions.length}
          </p>

          <p>
            Average Score: {averageScore}/10
          </p>

          <p>
            <strong>Skill Badge:</strong> {badge}
          </p>

          <p>
            Great job! Generate a new interview
            to continue practicing.
          </p>
        
        <button
           onClick={downloadReport}
           style={{
             marginTop: "20px",
             padding: "12px 25px",
             background: "#0f172a",
             color: "white",
             border: "none",
             borderRadius: "8px",
             cursor: "pointer",
             fontWeight: "bold",
            }}
          >
            📄 Download Report
          </button>

        </div>
      )}
    </div>
  );
}


export default Interview;