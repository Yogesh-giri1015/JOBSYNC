const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getRecruiterDashboardStats,
  getStudentDashboardStats,
} = require("../controllers/dashboardController");

router.get("/recruiter", protect, getRecruiterDashboardStats);
router.get("/student", protect, getStudentDashboardStats);

module.exports = router;
