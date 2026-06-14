import { useState } from "react";
import { generateQuestions } from "../services/gemini";

function Interview() {
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (topic) => {
    setLoading(true);

    try {
      const result = await generateQuestions(topic);
      setQuestions(result);
    } catch (error) {
      console.error(error);
      setQuestions("Failed to generate questions.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Mock Interview</h1>

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

      <div style={{ marginTop: "30px" }}>
        {loading ? (
          <p>Generating questions...</p>
        ) : (
          <pre>{questions}</pre>
        )}
      </div>
    </div>
  );
}

export default Interview;