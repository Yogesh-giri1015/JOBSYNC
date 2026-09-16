import { useEffect, useState } from "react";
import { getMyApplications } from "../services/applicationService";

const useApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch {
        setApplications([]);
      }
    }

    loadApplications();
  }, []);

  return applications;
};

export default useApplications;