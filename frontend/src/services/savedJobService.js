import api from "./api";

export const saveJob = async (jobId) => {
  const response = await api.post("/api/saved-jobs", {
    jobId,
  });

  return response.data;
};

export const getSavedJobs = async () => {
  const response = await api.get("/api/saved-jobs");

  return response.data;
};