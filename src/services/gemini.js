import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function generateQuestions(
  topic,
  difficulty
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate 5 ${difficulty} level interview questions for a fresher applying for a ${topic} role.

Difficulty Guidelines:

Easy:
- Basic concepts
- Definitions
- Beginner-friendly

Medium:
- Concept explanations
- Practical understanding
- Intermediate-level questions

Hard:
- Scenario-based questions
- Deep technical concepts
- Problem-solving questions

Return ONLY the questions in this format:

1. Question
2. Question
3. Question
4. Question
5. Question
`;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
}

export async function evaluateAnswer(
  question,
  answer
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return in EXACTLY this format:

Score: X/10

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Improved Answer:
(Provide a better answer)

Keep the evaluation professional, concise, and useful.
`;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
}

export async function generateInterviewSummary(
  role,
  difficulty,
  feedbacks
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a professional interview coach.

Role: ${role}
Difficulty: ${difficulty}

Interview Feedback:
${feedbacks}

Create a final interview report.

Format:

Overall Performance:
(Short paragraph)

Strengths:
- Point 1
- Point 2
- Point 3

Weaknesses:
- Point 1
- Point 2
- Point 3

Recommendations:
- Point 1
- Point 2
- Point 3

Final Verdict:
(2-3 lines)
`;

  const result = await model.generateContent(
    prompt
  );

  return result.response.text();
}