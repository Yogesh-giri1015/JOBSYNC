const Application = require("../models/Application");
const Job = require("../models/Job");
const asyncHandler = require("../utils/asyncHandler");

// Student applies to a job
// const applyJob = asyncHandler(async (req, res) => {
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   const { jobId } = req.body;

//   const job = await Job.findById(jobId);

//   if (!job) {
//     res.status(404);
//     throw new Error("Job not found");
//   }

//   // Prevent duplicate applications
//   const alreadyApplied = await Application.findOne({
//     student: req.user._id,
//     job: jobId,
//   });

//   if (alreadyApplied) {
//     res.status(400);
//     throw new Error("You have already applied for this job.");
//   }

//   const application = await Application.create({
//     student: req.user._id,
//     recruiter: job.postedBy,
//     job: jobId,
//   });

//   res.status(201).json(application);
// });
const applyJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  const alreadyApplied = await Application.findOne({
    student: req.user._id,
    job: jobId,
  });

  if (alreadyApplied) {
    res.status(400);
    throw new Error("You have already applied for this job.");
  }

  const application = await Application.create({
    student: req.user._id,
    recruiter: job.postedBy,
    job: jobId,
  });

  res.status(201).json(application);
});
// Student's applications
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    student: req.user._id,
  }).populate("job");

  const validApplications = applications.filter(
    (application) => application.job
  );

  res.json(validApplications);
});

// Recruiter views applicants for one job
const getApplicants = asyncHandler(async (req, res) => {
  const applications = await Application.find({
    job: req.params.jobId,
  })
    .populate("student", "-password")
    .populate("job");

  res.status(200).json(applications);
});
const acceptApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.status = "Accepted";

  await application.save();

  res.status(200).json(application);
});

const rejectApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.status = "Rejected";

  await application.save();

  res.status(200).json(application);
});
module.exports = {
  applyJob,
  getMyApplications,
  getApplicants,
  acceptApplication,
  rejectApplication,
};