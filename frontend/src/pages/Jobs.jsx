import { useCallback, useMemo, useState } from "react";
import SearchBar from "../components/jobs/SearchBar";
import JobList from "../components/jobs/JobList";
import Loading from "../components/common/Loading";
import useJobs from "../hooks/useJobs";
import { deleteJob as deleteJobAPI } from "../services/jobService";
const Jobs = () => {
  const [search, setSearch] = useState("");
  const { jobs, setJobs, loading, error } = useJobs();
  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()),
    );
  }, [jobs, search]);
  const editJob = useCallback((job) => {
    // Recruiter editing is handled in the shared job card flow.
    return job;
  }, []);
  const deleteJob = useCallback(
    async (id) => {
      try {
        await deleteJobAPI(id);

        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      } catch {
        // Keep the UI responsive without surfacing noisy errors.
      }
    },
    [setJobs],
  );
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
        <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            We could not load the jobs
          </h2>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 rounded-4xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Browse Jobs</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Discover your next role with calm focus.
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Explore thoughtfully curated opportunities with a premium browsing experience designed for modern professionals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
                {filteredJobs.length} match{filteredJobs.length === 1 ? "" : "es"}
              </div>
              <div className="rounded-2xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700 shadow-sm">
                AI Match Ready
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200/80 bg-white/80 p-4 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.2)] backdrop-blur sm:p-6">
          <div className="mb-5">
            <SearchBar
              search={search}
              setSearch={setSearch}
              resultCount={filteredJobs.length}
            />
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-600">
            <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm">Future filters</span>
            <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-500 shadow-sm">Location</span>
            <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-500 shadow-sm">Salary</span>
            <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-500 shadow-sm">Experience</span>
          </div>

          <JobList
            jobs={filteredJobs}
            deleteJob={deleteJob}
            editJob={editJob}
          />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
