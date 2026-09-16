const { GoogleGenAI } = require("@google/genai");
const pdf = require("pdf-parse");

const getClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured.");
    }

    return new GoogleGenAI({ apiKey });
};

const extractJson = (text) => {
    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");

    if (firstBrace >= 0 && lastBrace > firstBrace) {
        return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
    }

    if (firstBracket >= 0 && lastBracket > firstBracket) {
        return JSON.parse(cleaned.slice(firstBracket, lastBracket + 1));
    }

    return JSON.parse(cleaned);
};

const generateInterviewQuestions = async ({ role, experience }) => {
    try {
        const client = getClient();

        const prompt = `
You are an expert career coach.
Generate 10 interview questions for a ${role} role with ${experience} experience.
For each question, return:
- question
- answer
- difficulty
- interviewTips
Return valid JSON only in this format:
{"questions":[{"question":"...","answer":"...","difficulty":"...","interviewTips":"..."}]}
`;

        const response = await client.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });
        const text = response.text || "";
        const parsed = extractJson(text);

        if (parsed.questions && Array.isArray(parsed.questions)) {
            return { questions: parsed.questions };
        }

        return { questions: [] };
    } catch (error) {
        throw new Error(`Failed to generate interview questions: ${error.message}`);
    }
};

const generateCoverLetter = async ({ company, role, jobDescription, candidateName }) => {
    try {
        const client = getClient();

        const prompt = `
Write a professional cover letter for a candidate named ${candidateName || "A candidate"} applying to ${role} at ${company}.
Use the following job description:
${jobDescription}
Return only the cover letter text, no extra commentary.
`;

        const response = await client.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });
        const text = response.text || "";

        return {
            coverLetter: text.trim(),
        };
    } catch (error) {
        throw new Error(`Failed to generate cover letter: ${error.message}`);
    }
};

const extractTextFromPdfBuffer = async (buffer) => {
    const data = await pdf(buffer);
    return data.text;
};

const analyzeResume = async ({ resumeText, jobDescription }) => {
    try {
        const client = getClient();

        const prompt = `
Analyze the following resume text and compare it to the provided job description.
Return valid JSON only with this structure:
{
  "matchScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "recommendations": []
}
Resume text:
${resumeText}

Job description:
${jobDescription || "No specific job description provided."}
`;

        const response = await client.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });
        const text = response.text || "";
        const parsed = extractJson(text);

        return {
            matchScore: parsed.matchScore ?? 0,
            strengths: parsed.strengths ?? [],
            weaknesses: parsed.weaknesses ?? [],
            missingSkills: parsed.missingSkills ?? [],
            recommendations: parsed.recommendations ?? [],
        };
    } catch (error) {
        throw new Error(`Failed to analyze resume: ${error.message}`);
    }
};

module.exports = {
    generateInterviewQuestions,
    generateCoverLetter,
    extractTextFromPdfBuffer,
    analyzeResume,
};
