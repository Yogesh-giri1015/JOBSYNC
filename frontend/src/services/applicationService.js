import api from "./api";

export const applyJob = async (jobId) => {
    const response = await api.post("/api/applications", {
        jobId,
    });

    return response.data;
};

export const getMyApplications = async () => {
    const response = await api.get("/api/applications/my");

    return response.data;
};
export const getApplicants = async (jobId) => {
  const response = await api.get(`/api/applications/job/${jobId}`);

  return response.data;
};

export const acceptApplication = async (id) => {
  const response = await api.patch(`/api/applications/${id}/accept`);

  return response.data;
};

export const rejectApplication = async (id) => {
  const response = await api.patch(`/api/applications/${id}/reject`);

  return response.data;
};