import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function generateQuestions(topic) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate ONE interview question for a fresher applying for a ${topic} role.

Return only the question.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function evaluateAnswer(question, answer) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer and return in this exact format:

Score: X/10

Strengths:
- point 1
- point 2

Weaknesses:
- point 1
- point 2

Improved Answer:
(write a better answer)
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}