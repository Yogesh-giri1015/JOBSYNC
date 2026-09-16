const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const {
  generateInterview,
  generateCoverLetterText,
  resumeMatch,
} = require("../controllers/aiController");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/interview", protect, generateInterview);
router.post("/cover-letter", protect, generateCoverLetterText);
router.post("/resume-match", protect, upload.single("resume"), resumeMatch);

module.exports = router;
