const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
} = require("../controllers/jobController");
const optionalAuth = require("../middleware/optionalAuth");

router.get("/", optionalAuth, getJobs);

router.get("/my-jobs", protect, getRecruiterJobs);

router.get("/:id", getJobById);

router.post("/", protect, createJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;