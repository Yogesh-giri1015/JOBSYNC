import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AddJobForm from "../components/jobs/AddJobForm";
import {
  createJob,
  updateJob,
  fetchRecruiterDashboardStats,
} from "../services/jobService";
import {
  BriefcaseIcon,
  ChartBarIcon,
  ClockIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";
import useRecruiterJobs from "../hooks/useRecruiterJobs";
const RecruiterDashboard = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [workMode, setWorkMode] = useState("On-site");
  const [experience, setExperience] = useState("0-1 Years");
  const [type, setType] = useState("Full-Time");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    jobs: 0,
    applications: 0,
    pending: 0,
    accepted: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const { user } = useAuth();
  const { jobs, setJobs } = useRecruiterJobs();
  async function saveJob() {
    try {
      const jobData = {
        title,
        company,
        location,
        salary,
        workMode,
        experience,
        type,
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        description,
      };

      if (editingId) {
        const updatedJob = await updateJob(editingId, jobData);

        setJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === editingId ? updatedJob : job)),
        );
        toast.success("Job updated successfully.");
      } else {
        const newJob = await createJob(jobData);

        setJobs((prevJobs) => [newJob, ...prevJobs]);

        toast.success("Job posted successfully.");
      }

      setEditingId(null);

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");

      setWorkMode("On-site");
      setExperience("0-1 Years");
      setType("Full-Time");

      setSkills("");
      setDescription("");
    } catch {
      toast.error("Unable to save job.");
    }
  }
  const editJob = (job) => {
    setEditingId(job.id);

    setTitle(job.title);
    setCompany(job.company);
    setLocation(job.location);
    setSalary(job.salary);

    setWorkMode(job.workMode);
    setExperience(job.experience);
    setType(job.type);
    setSkills(
      Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
    );
    setDescription(job.description);
  };
  const cancelEdit = () => {
    setEditingId(null);

    setTitle("");
    setCompany("");
    setLocation("");
    setSalary("");

    setWorkMode("On-site");
    setExperience("0-1 Years");
    setType("Full-Time");

    setSkills("");
    setDescription("");
  };
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchRecruiterDashboardStats();
        setDashboardStats({
          jobs: data.jobs || 0,
          applications: data.applications || 0,
          pending: data.pending || 0,
          accepted: data.accepted || 0,
        });
      } catch {
        setDashboardStats({
          jobs: 0,
          applications: 0,
          pending: 0,
          accepted: 0,
        });
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  const stats = [
    {
      label: "Jobs Posted",
      value: loadingStats ? "..." : dashboardStats.jobs,
      icon: BriefcaseIcon,
    },
    {
      label: "Total Applications",
      value: loadingStats ? "..." : dashboardStats.applications,
      icon: UsersIcon,
    },
    {
      label: "Pending Applications",
      value: loadingStats ? "..." : dashboardStats.pending,
      icon: ChartBarIcon,
    },
    {
      label: "Accepted Applications",
      value: loadingStats ? "..." : dashboardStats.accepted,
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-700">
                <SparklesIcon className="h-4 w-4" />
                Recruiter workspace
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back, {user?.name || "Recruiter"}!
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Run hiring from a calm, premium workspace with clear visibility
                into your pipeline and latest activity.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
              {loadingStats
                ? "Loading..."
                : `${dashboardStats.pending} pending applications`}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <AddJobForm
              title={title}
              setTitle={setTitle}
              company={company}
              setCompany={setCompany}
              location={location}
              setLocation={setLocation}
              salary={salary}
              setSalary={setSalary}
              workMode={workMode}
              setWorkMode={setWorkMode}
              experience={experience}
              setExperience={setExperience}
              type={type}
              setType={setType}
              skills={skills}
              setSkills={setSkills}
              description={description}
              setDescription={setDescription}
              saveJob={saveJob}
              editingId={editingId}
              cancelEdit={cancelEdit}
            />
          </aside>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Jobs</h2>

              <span className="text-blue-600 font-semibold">
                {jobs.length} Jobs
              </span>
            </div>

            <div className="space-y-4 mt-5">
              {jobs.length === 0 ? (
                <div className="text-center text-slate-500 py-10">
                  No jobs posted yet.
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-2xl border bg-slate-50 p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>

                      <p className="text-sm text-slate-500">{job.company}</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => editJob(job)}
                        className="font-semibold text-amber-600 hover:text-amber-700"
                      >
                        Edit
                      </button>

                      <Link
                        to={`/recruiter/jobs/${job._id}`}
                        className="font-semibold text-blue-600"
                      >
                        View Applicants
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="space-y-6">
            {/* <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Recent Applicants
                </h2>
                <button className="text-sm font-semibold text-blue-600">
                  Review
                </button>
              </div>
              <div className="mt-5 space-y-3">
                {[{ name: "No applicants yet.", role: "" }].map((applicant) => (
                  <div
                    key={applicant.name}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {applicant.name}
                      </p>
                      <p className="text-sm text-slate-500">{applicant.role}</p>
                    </div>
                    <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div> */}

            {/* <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Recent Activity
                </h2>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                  Live
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { label: "New role posted", time: "15 mins ago" },
                  { label: "Interview scheduled", time: "1h ago" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">
                        <ClockIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.label}
                        </p>
                        <p className="text-sm text-slate-500">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
