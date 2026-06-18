import { useState } from "react";
import { parseResume } from "../utils/resumeParser";
import {
  generateResumeQuestions,
  generateInterviewFeedback,
} from "../services/gemini";


function ResumeInterview() {
const [resume, setResume] = useState(null);
const [resumeText, setResumeText] = useState("");
const [loading, setLoading] = useState(false);

const [questions, setQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);

const [answers, setAnswers] = useState([]);
const [currentAnswer, setCurrentAnswer] = useState("");

const [interviewStarted, setInterviewStarted] =
  useState(false);

const [feedback, setFeedback] = useState("");

const [error, setError] = useState("");

const [isListening, setIsListening] =
  useState(false);

const handleFileChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setLoading(true);

    setResume(file);

    const text = await parseResume(file);

    setResumeText(text);

    // Reset previous interview
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setCurrentAnswer("");
    setInterviewStarted(false);
    setFeedback("");
    setError("");
  } catch (error) {
    console.error(error);

    alert("Failed to read PDF file.");
  } finally {
    setLoading(false);
  }
};

const handleGenerateQuestions = async () => {
  try {
    setLoading(true);

    const result =
      await generateResumeQuestions(
        resumeText
      );

    const parsedQuestions = result
      .split("\n")
      .filter((line) =>
        /^\d+\./.test(line.trim())
      );

    setQuestions(parsedQuestions);
  } catch (error) {
    console.error(error);

    alert(
      error?.message ||
        "Failed to generate interview questions."
    );
  } finally {
    setLoading(false);
  }
};

const handleSubmitInterview = async () => {
  if (
    answers.length !== questions.length
  ) {
    alert(
      "Please answer all questions before submitting."
    );
    return;
  }

  try {
    setLoading(true);

    const result =
      await generateInterviewFeedback(
        questions,
        answers
      );

    setFeedback(result);
  } catch (error) {
    console.error(error);

    alert(
      "Failed to generate interview feedback."
    );
  } finally {
    setLoading(false);
  }
};

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Speech Recognition is not supported in this browser."
    );
    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.start();

  setIsListening(true);

  recognition.onresult = (event) => {
    const transcript =
      event.results[0][0].transcript;

    setCurrentAnswer(
      (prev) =>
        prev + " " + transcript
    );
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onerror = () => {
    setIsListening(false);
  };
};

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "40px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginBottom: "10px",
      }}
    >
      AI Resume Interview Simulator
    </h1>

    <p
      style={{
        textAlign: "center",
        color: "#94a3b8",
        marginBottom: "30px",
      }}
    >
      Upload your resume and take an AI-powered mock interview.
    </p>

    {/* Upload Section */}
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h3>Upload Resume (PDF)</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {resume && (
        <p
          style={{
            marginTop: "15px",
            color: "#22c55e",
          }}
        >
          ✓ {resume.name}
        </p>
      )}

      {loading && (
        <p
          style={{
            marginTop: "10px",
            color: "#facc15",
          }}
        >
          Processing...
        </p>
      )}
    </div>

    {/* Resume Preview */}
    {resumeText && (
      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h3>Resume Preview</h3>

        <textarea
          value={resumeText}
          readOnly
          rows="10"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            resize: "none",
          }}
        />

        <button
          onClick={handleGenerateQuestions}
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Generating Questions..."
            : "Generate Interview Questions"}
        </button>
      </div>
    )}

    {/* Questions Preview */}
    {questions.length > 0 &&
      !interviewStarted && (
        <div
          style={{
            marginTop: "20px",
            background: "#334155",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <h3>Generated Interview Questions</h3>

          {questions.map((q, index) => (
            <div
              key={index}
              style={{
                marginBottom: "12px",
              }}
            >
              {q}
            </div>
          ))}

          <button
            onClick={() =>
              setInterviewStarted(true)
            }
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Start Interview
          </button>
        </div>
      )}

    {/* Interview */}
{interviewStarted &&
  currentQuestion < questions.length && (
    <div
      style={{
        marginTop: "20px",
        background: "#334155",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h3>
          Question {currentQuestion + 1}/
          {questions.length}
        </h3>

        <span>
          {Math.round(
            ((currentQuestion + 1) /
              questions.length) *
              100
          )}
          % Complete
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: "8px",
          background: "#1e293b",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${
              ((currentQuestion + 1) /
                questions.length) *
              100
            }%`,
            height: "100%",
            background: "#22c55e",
            borderRadius: "20px",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.7",
        }}
      >
        {questions[currentQuestion]}
      </p>

      <textarea
        rows="6"
        value={currentAnswer}
        onChange={(e) =>
          setCurrentAnswer(e.target.value)
        }
        placeholder="Enter your answer..."
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          marginTop: "15px",
        }}
      />

      {/* Character Count */}
      <div
        style={{
          textAlign: "right",
          marginTop: "5px",
          color: "#94a3b8",
        }}
      >
        {currentAnswer.length} characters
      </div>

      {/* Voice Answer Button */}
      <button
        onClick={startListening}
        style={{
          marginTop: "10px",
          padding: "10px 18px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {isListening
          ? "Listening..."
          : "🎤 Speak Answer"}
      </button>

      {/* Next Button */}
      <button
        onClick={() => {
          if (!currentAnswer.trim()) {
            alert(
              "Please answer this question before proceeding."
            );
            return;
          }

          setAnswers([
            ...answers,
            currentAnswer,
          ]);

          setCurrentAnswer("");

          setCurrentQuestion(
            currentQuestion + 1
          );
        }}
        style={{
          marginTop: "15px",
          padding: "12px 24px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {currentQuestion ===
        questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </button>
    </div>
  )}

{/* Submit */}
{interviewStarted &&
  currentQuestion >=
    questions.length &&
  !feedback && (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      <button
        onClick={handleSubmitInterview}
        disabled={loading}
        style={{
          padding: "14px 30px",
          background: "#f97316",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading
          ? "Evaluating..."
          : "Generate Interview Report"}
      </button>
    </div>
  )}

{/* Feedback */}
{feedback && (
  <div
    style={{
      marginTop: "30px",
      background: "#334155",
      padding: "25px",
      borderRadius: "12px",
    }}
  >
    <h2>
      Interview Evaluation Report
    </h2>

    <pre
      style={{
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
        fontSize: "15px",
        marginTop: "15px",
      }}
    >
      {feedback}
    </pre>

    <div
      style={{
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => {
          const blob = new Blob(
            [feedback],
            {
              type: "text/plain",
            }
          );

          const link =
            document.createElement("a");

          link.href =
            URL.createObjectURL(blob);

          link.download =
            "Interview_Report.txt";

          link.click();
        }}
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Download Report
      </button>

      <button
        onClick={() => {
          setResume(null);
          setResumeText("");
          setQuestions([]);
          setAnswers([]);
          setCurrentQuestion(0);
          setCurrentAnswer("");
          setInterviewStarted(false);
          setFeedback("");
        }}
        style={{
          padding: "12px 20px",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Start New Interview
      </button>
    </div>
  </div>
)}
  </div>
);
}

export default ResumeInterview;