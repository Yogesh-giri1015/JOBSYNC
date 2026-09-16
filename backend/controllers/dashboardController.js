const Application = require("../models/Application");
const Job = require("../models/Job");
const SavedJob = require("../models/SavedJob");
const asyncHandler = require("../utils/asyncHandler");

const getRecruiterDashboardStats = asyncHandler(async (req, res) => {
  const [jobs, applications, pending, accepted] = await Promise.all([
    Job.countDocuments({ postedBy: req.user._id }),
    Application.countDocuments({ recruiter: req.user._id }),
    Application.countDocuments({ recruiter: req.user._id, status: "Pending" }),
    Application.countDocuments({ recruiter: req.user._id, status: "Accepted" }),
  ]);

  res.status(200).json({
    jobs,
    applications,
    pending,
    accepted,
  });
});

const getStudentDashboardStats = asyncHandler(async (req, res) => {
  const [applied, saved, accepted, rejected] = await Promise.all([
    Application.countDocuments({ student: req.user._id }),
    SavedJob.countDocuments({ student: req.user._id }),
    Application.countDocuments({ student: req.user._id, status: "Accepted" }),
    Application.countDocuments({ student: req.user._id, status: "Rejected" }),
  ]);

  res.status(200).json({
    applied,
    saved,
    accepted,
    rejected,
  });
});

module.exports = {
  getRecruiterDashboardStats,
  getStudentDashboardStats,
};
