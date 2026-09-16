import { useEffect, useState } from "react";
import { getApplicants } from "../services/applicationService";

const useApplicants = (jobId) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    async function loadApplicants() {
      try {
        const data = await getApplicants(jobId);
        setApplicants(data);
      } catch {
        setApplicants([]);
      }
    }

    if (jobId) {
      loadApplicants();
    }
  }, [jobId]);

  return { applicants, setApplicants };
};

export default useApplicants;