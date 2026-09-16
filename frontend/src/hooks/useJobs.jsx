import { useState, useEffect } from "react";
import { fetchJobs } from "../services/jobService";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return {
    jobs,
    setJobs,
    loading,
    error,
  };
};

export default useJobs;