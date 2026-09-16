const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");
const SavedJob = require("../models/SavedJob");
// GET /jobs
const Application = require("../models/Application");

const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().lean();

  // If no logged in user OR recruiter, return normal jobs
  if (!req.user || req.user.role !== "student") {
    return res.status(200).json(jobs);
  }

  // Get all applications of this student
  const applications = await Application.find({
    student: req.user._id,
  });

  const applicationMap = {};

  applications.forEach((application) => {
    applicationMap[application.job.toString()] = application.status;
  });

  const jobsWithStatus = jobs.map((job) => ({
    ...job,
    applicationStatus: applicationMap[job._id.toString()] || null,
  }));

  res.status(200).json(jobsWithStatus);
});

// GET /jobs/:id
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json(job);
});

// POST /jobs
const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    ...req.body,
    postedBy: req.user._id,
  });

  res.status(201).json(job);
});

// PUT /jobs/:id
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this job");
  }

  Object.assign(job, req.body);

  await job.save();

  res.status(200).json(job);
});

// DELETE /jobs/:id
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this job");
  }

  const jobId = job._id;

  // Delete all applications of this job
  await Application.deleteMany({ job: jobId });

  // Delete all saved-job entries of this job
  await SavedJob.deleteMany({ job: jobId });

  // Delete the job itself
  await job.deleteOne();
  res.status(200).json({
    message: "Job deleted successfully",
  });
});
const getRecruiterJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({
    postedBy: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json(jobs);
});
module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
};