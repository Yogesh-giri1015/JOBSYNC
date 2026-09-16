import api from "./api";

// GET ALL JOBS

export const fetchJobs = async () => {
  const response = await api.get("/jobs");

  return response.data.map((job) => ({
    ...job,
    id: job._id,
  }));
};

// CREATE JOB
export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);

  return {
    ...response.data,
    id: response.data._id,
  };
};

// UPDATE JOB
export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData);

  return {
    ...response.data,
    id: response.data._id,
  };
};

// DELETE JOB
export const deleteJob = async (id) => {
  await api.delete(`/jobs/${id}`);
};

export const fetchRecruiterJobs = async () => {
  const response = await api.get("/jobs/my-jobs");

  return response.data.map((job) => ({
    ...job,
    id: job._id,
  }));
};

export const fetchRecruiterDashboardStats = async () => {
  const response = await api.get("/api/dashboard/recruiter");

  return response.data;
};

export const fetchStudentDashboardStats = async () => {
  const response = await api.get("/api/dashboard/student");

  return response.data;
};