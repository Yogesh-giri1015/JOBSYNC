const SavedJob = require("../models/SavedJob");
const asyncHandler = require("../utils/asyncHandler");

// Save Job
const saveJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  const exists = await SavedJob.findOne({
    student: req.user._id,
    job: jobId,
  });

  if (exists) {
    res.status(400);
    throw new Error("Job already saved");
  }

  const saved = await SavedJob.create({
    student: req.user._id,
    job: jobId,
  });

  res.status(201).json(saved);
});

// Get Saved Jobs
const getSavedJobs = asyncHandler(async (req, res) => {
  const savedJobs = await SavedJob.find({
    student: req.user._id,
  }).populate("job");

  const validSavedJobs = savedJobs.filter(
    (savedJob) => savedJob.job
  );

  res.json(validSavedJobs);
});

// Remove Saved Job
const removeSavedJob = asyncHandler(async (req, res) => {
  await SavedJob.findOneAndDelete({
    _id: req.params.id,
    student: req.user._id,
  });

  res.json({
    message: "Job removed",
  });
});

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};