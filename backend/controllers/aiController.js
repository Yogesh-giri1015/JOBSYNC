const asyncHandler = require("../utils/asyncHandler");
const {
  generateInterviewQuestions,
  generateCoverLetter,
  extractTextFromPdfBuffer,
  analyzeResume,
} = require("../services/geminiService");

const generateInterview = asyncHandler(async (req, res) => {
  const { role, experience } = req.body;

  if (!role || !experience) {
    res.status(400);
    throw new Error("Role and experience are required.");
  }

  const data = await generateInterviewQuestions({ role, experience });
  res.status(200).json(data);
});

const generateCoverLetterText = asyncHandler(async (req, res) => {
  const { company, role, jobDescription, candidateName } = req.body;

  if (!company || !role || !jobDescription || !candidateName) {
    res.status(400);
    throw new Error("Company, role, job description, and candidate name are required.");
  }

  const data = await generateCoverLetter({ company, role, jobDescription, candidateName });
  res.status(200).json(data);
});

const resumeMatch = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("A PDF resume is required.");
  }

  const resumeText = await extractTextFromPdfBuffer(req.file.buffer);
  const data = await analyzeResume({
    resumeText,
    jobDescription: req.body.jobDescription || "",
  });

  res.status(200).json(data);
});

module.exports = {
  generateInterview,
  generateCoverLetterText,
  resumeMatch,
};
