const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicants,
  acceptApplication,
  rejectApplication,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, applyJob);

router.get("/my", protect, getMyApplications);

router.get("/job/:jobId", protect, getApplicants);
router.patch("/:id/accept", protect, acceptApplication);

router.patch("/:id/reject", protect, rejectApplication);
module.exports = router;