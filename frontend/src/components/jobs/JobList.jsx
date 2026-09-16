import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import JobCard from "./JobCard";

const JobList = ({ jobs, deleteJob, editJob }) => {
  return (
    <div className="mt-6">
      {jobs.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              experience={job.experience}
              workMode={job.workMode}
              type={job.type}
              skills={job.skills}
              createdAt={job.createdAt}
              verified={job.verified}
              applicationStatus={job.applicationStatus}
              deleteJob={deleteJob}
              editJob={editJob}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <MagnifyingGlassIcon className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            No openings match this search yet
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Try a broader keyword or refine your search to uncover more opportunities.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:border-blue-200 hover:text-blue-600">
            Explore all roles
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;
