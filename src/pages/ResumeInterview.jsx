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
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      setResume(file);

      const text = await parseResume(file);

      setResumeText(text);

      console.log(text);
    } catch (error) {
      console.error("Resume parsing error:", error);
      alert("Failed to read PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    console.log("BUTTON CLICKED");

    try {
      setLoading(true);

      const result = await generateResumeQuestions(
        resumeText
      );

      console.log("Gemini Response:", result);

      const parsedQuestions = result
        .split("\n")
        .filter((line) =>
          /^\d+\./.test(line.trim())
        );

      console.log(
        "Parsed Questions:",
        parsedQuestions
      );

      setQuestions(parsedQuestions);
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
          "Failed to generate questions"
      );
    } finally {
      setLoading(false);
    }
  };

   const handleSubmitInterview =
  async () => {
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

      console.log("Questions:", questions);
      console.log("Answers:", answers);

      const result =
        await generateInterviewFeedback(
          questions,
          answers
        );

      setFeedback(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>Resume Based Interview</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h3>Upload Resume (PDF)</h3>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />

        {resume && (
          <p style={{ marginTop: "15px" }}>
            Selected File:
            <strong> {resume.name}</strong>
          </p>
        )}

        {loading && (
          <p style={{ marginTop: "15px" }}>
            Processing...
          </p>
        )}
      </div>

      {resumeText && (
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "20px",
          }}
        >
          <h3>Extracted Resume Text</h3>

          <textarea
            value={resumeText}
            readOnly
            rows="15"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />

          <button
            onClick={handleGenerateQuestions}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Generating..."
              : "Generate Interview Questions"}
          </button>

          {questions.length > 0 && (
            <div
              style={{
                marginTop: "20px",
                background: "#334155",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h3>Generated Questions</h3>

              {questions.map((q, index) => (
                <p key={index}>{q}</p>
              ))}
            </div>
          )}

          {questions.length > 0 &&
            !interviewStarted && (
              <button
                onClick={() =>
                  setInterviewStarted(true)
                }
                style={{
                  marginTop: "20px",
                  padding: "12px 20px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Start Interview
              </button>
            )}

          {interviewStarted &&
            currentQuestion <
              questions.length && (
              <div
                style={{
                  marginTop: "20px",
                  background: "#475569",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h3>
                  Question{" "}
                  {currentQuestion + 1}
                </h3>

                <p>
                  {
                    questions[
                      currentQuestion
                    ]
                  }
                </p>

                <textarea
                  rows="5"
                  value={currentAnswer}
                  onChange={(e) =>
                    setCurrentAnswer(
                      e.target.value
                    )
                  }
                  placeholder="Type your answer..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />

                <button
                  onClick={() => {

                   if (!currentAnswer.trim()) {
                      alert(
                         "Please answer this question first."
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
                    padding: "10px 20px",
                    background:
                      "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Next Question
                </button>
              </div>
            )}

          {interviewStarted &&
            currentQuestion >=
              questions.length &&
            !feedback && (
              <button
                onClick={
                  handleSubmitInterview
                }
                style={{
                  marginTop: "20px",
                  padding: "12px 20px",
                  background: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Submit Interview
              </button>
            )}

          {feedback && (
            <div
              style={{
                marginTop: "20px",
                background: "#334155",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h3>
                Interview Feedback
              </h3>

              <pre
                style={{
                  whiteSpace:
                    "pre-wrap",
                }}
              >
                {feedback}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  </>
);
}

export default ResumeInterview;