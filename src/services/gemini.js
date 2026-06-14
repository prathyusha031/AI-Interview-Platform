import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("API KEY:", import.meta.env.VITE_GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function generateQuestions(topic) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate 5 interview questions for a fresher in ${topic}.

Return only the questions.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}