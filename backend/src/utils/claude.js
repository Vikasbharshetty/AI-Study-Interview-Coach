import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

function extractJson(text) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) return null;
  return JSON.parse(text.slice(start, end + 1));
}

export async function generateQuestionsWithClaude({ resumeText, role, count }) {
  const prompt = `
You are an expert technical interviewer.
Generate ${count} interview questions for a ${role}.
Use this resume text:

${resumeText.slice(0, 12000)}

Return only a JSON array of strings. No markdown.
`;

  const response = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-latest",
    max_tokens: 1200,
    messages: [{ role: "user", content: prompt }]
  });

  const text = response.content[0]?.text || "[]";
  return extractJson(text) || [];
}

export async function generateAnswersWithClaude(questions) {
  const prompt = `
Answer these interview questions for a beginner-friendly full-stack developer interview.
Return only a JSON array. Each item must have "question" and "answer".

Questions:
${questions.map((item, index) => `${index + 1}. ${item.question}`).join("\n")}
`;

  const response = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-latest",
    max_tokens: 2500,
    messages: [{ role: "user", content: prompt }]
  });

  const text = response.content[0]?.text || "[]";
  return extractJson(text) || [];
}
