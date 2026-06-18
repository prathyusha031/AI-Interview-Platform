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

Return ONLY:

1. Question
2. Question
3. Question
4. Question
5. Question
`;

  const result = await model.generateContent(prompt);

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
Question:
${question}

Candidate Answer:
${answer}

Evaluate and return:

Score: X/10

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Improved Answer:
(Better answer)
`;

  const result = await model.generateContent(prompt);

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
Role: ${role}
Difficulty: ${difficulty}

Feedback:
${feedbacks}

Create:

Overall Performance

Strengths

Weaknesses

Recommendations

Final Verdict
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function generateResumeQuestions(
  resumeText
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Analyze this resume and generate 5 professional interview questions.

Resume:
${resumeText}

Rules:
- Ask only from skills, projects, internship and technologies.
- Mix technical and project questions.
- Number every question.

Format:

1. Question
2. Question
3. Question
4. Question
5. Question
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

export async function generateInterviewFeedback(
  questions,
  answers
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a professional technical interviewer.

Interview Questions:
${questions.join("\n\n")}

Candidate Answers:
${answers.join("\n\n")}

IMPORTANT:
- Evaluate ONLY the candidate answers.
- Do NOT evaluate the interview questions.
- Do NOT praise the interviewer.
- If answers are empty, missing, or very short, give a low score.
- Score based on technical knowledge, clarity, confidence, and completeness.

Return in this format:

Overall Score: X/10

Question-wise Evaluation:

Question 1:
Score: X/10
Feedback:
...

Question 2:
Score: X/10
Feedback:
...

Strengths:
- Point 1
- Point 2

Weaknesses:
- Point 1
- Point 2

Suggestions:
- Point 1
- Point 2

Final Verdict:
...
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}