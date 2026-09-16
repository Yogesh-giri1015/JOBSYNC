import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  BookmarkIcon,
  CheckCircleIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import AIBadge from "../components/common/AIBadge";
import useAuth from "../hooks/useAuth";
import { getMyApplications } from "../services/applicationService";
import { fetchJobs, fetchStudentDashboardStats } from "../services/jobService";
import { getSavedJobs } from "../services/savedJobService";
import { formatSalary } from "../utils/formatSalary";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [dashboardStats, setDashboardStats] = useState({
    applied: 0,
    saved: 0,
    accepted: 0,
    rejected: 0,
  });
  const [latestJobs, setLatestJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [loadingSavedJobs, setLoadingSavedJobs] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, jobsData, applicationsData, savedJobsData] =
          await Promise.all([
            fetchStudentDashboardStats(),
            fetchJobs(),
            getMyApplications(),
            getSavedJobs(),
          ]);

        setDashboardStats({
          applied: statsData.applied || 0,
          saved: statsData.saved || 0,
          accepted: statsData.accepted || 0,
          rejected: statsData.rejected || 0,
        });
        setLatestJobs((jobsData || []).slice(0, 3));
        setApplications((applicationsData || []).slice(0, 3));
        setSavedJobs((savedJobsData || []).slice(0, 3));
      } catch {
        setDashboardStats({
          applied: 0,
          saved: 0,
          accepted: 0,
          rejected: 0,
        });
        setLatestJobs([]);
        setApplications([]);
        setSavedJobs([]);
      } finally {
        setLoadingStats(false);
        setLoadingJobs(false);
        setLoadingApplications(false);
        setLoadingSavedJobs(false);
      }
    };

    loadDashboardData();
  }, []);

  const stats = [
    {
      label: "Applied Jobs",
      value: loadingStats ? "..." : dashboardStats.applied,
      color: "text-blue-600",
    },
    {
      label: "Saved Jobs",
      value: loadingStats ? "..." : dashboardStats.saved,
      color: "text-green-600",
    },
    {
      label: "Accepted Applications",
      value: loadingStats ? "..." : dashboardStats.accepted,
      color: "text-purple-600",
    },
    {
      label: "Rejected Applications",
      value: loadingStats ? "..." : dashboardStats.rejected,
      color: "text-red-600",
    },
  ];

  const quickActions = [
    {
      title: "Browse Jobs",
      path: "/jobs",
      icon: BriefcaseIcon,
    },
    {
      title: "Saved Jobs",
      path: "/jobs",
      icon: BookmarkIcon,
    },
    {
      title: "My Applications",
      path: "/applications",
      icon: CheckCircleIcon,
    },
    {
      title: "AI Career Copilot",
      path: "/ai",
      icon: SparklesIcon,
    },
  ];

  const totalApplications = dashboardStats.applied;
  const acceptedApplications = dashboardStats.accepted;
  const progressValue =
    totalApplications > 0
      ? Math.round((acceptedApplications / totalApplications) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
            <div>
              <AIBadge label="Career Copilot" />

              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                Welcome back,
                <span className="text-blue-600">
                  {" "}
                  {user?.name || "Student"}
                </span>
                👋
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600 text-lg">
                Track your applications, discover opportunities, and stay on top
                of your next move.
              </p>
            </div>

            <div className="rounded-2xl border bg-blue-50 px-5 py-4">
              <p className="text-sm text-slate-500">Application Progress</p>

              {totalApplications > 0 ? (
                <>
                  <h2 className="mt-2 text-3xl font-bold text-blue-700">
                    {progressValue}%
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {acceptedApplications} accepted of {totalApplications}{" "}
                    applications
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-500">
                  Start applying to jobs.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="rounded-2xl border bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition p-6 flex flex-col items-center gap-4"
                >
                  <Icon className="h-8 w-8 text-blue-600" />

                  <p className="font-semibold">{item.title}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6"
            >
              <p className="text-slate-500">{item.label}</p>

              <h2 className={`mt-3 text-4xl font-bold ${item.color}`}>
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Latest Opportunities</h2>

                <Link to="/jobs" className="text-blue-600 font-semibold">
                  View All
                </Link>
              </div>

              <div className="space-y-4 mt-6">
                {loadingJobs ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Preparing fresh opportunities...
                  </div>
                ) : latestJobs.length === 0 ? (
                  <p className="text-slate-500">
                    No opportunities available yet.
                  </p>
                ) : (
                  latestJobs.map((job) => (
                    <Link
                      key={job._id}
                      to="/jobs"
                      className="block rounded-2xl border bg-slate-50 p-5 hover:shadow transition"
                    >
                      <div className="flex justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-slate-500">{job.company}</p>
                        </div>
                        <div className="text-blue-600">
                          <ArrowRightIcon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-4 text-sm">
                        <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1">
                          {job.workMode}
                        </span>
                        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1">
                          {formatSalary(job.salary)}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold">Saved Jobs</h2>

                <Link to="/jobs" className="text-blue-600 font-semibold">
                  View All
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {loadingSavedJobs ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Loading your saved roles...
                  </div>
                ) : savedJobs.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                    <BookmarkIcon className="h-10 w-10 mx-auto text-slate-400" />
                    <p className="mt-3 text-slate-500">No saved jobs yet.</p>
                  </div>
                ) : (
                  savedJobs
                    .filter((savedJob) => savedJob.job)
                    .map((item) => (
                      <div
                        key={item._id}
                        className="rounded-2xl border bg-slate-50 p-4"
                      >
                        <h3 className="font-semibold">{item.job?.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.job?.company}
                        </p>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-purple-600 via-violet-600 to-indigo-600 p-6 text-white shadow-[0_20px_70px_-24px_rgba(139,92,246,0.6)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-100 font-medium">
                    Career Copilot
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    AI Career Assistant
                  </h2>

                  <p className="mt-3 text-purple-100">
                    Keep your next steps clear with focused AI support.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/15 p-4">
                  <SparklesIcon className="h-8 w-8" />
                </div>
              </div>

              <div className="grid gap-3 mt-6">
                {[
                  { label: "Resume Match", path: "/ai" },
                  { label: "Interview Questions", path: "/ai" },
                  { label: "Cover Letter Generator", path: "/ai" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-4 hover:bg-white/20 transition"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ArrowRightIcon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">My Applications</h2>

                <Link
                  to="/applications"
                  className="text-blue-600 font-semibold"
                >
                  View All
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {loadingApplications ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    Syncing your applications...
                  </div>
                ) : applications.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                    <BriefcaseIcon className="mx-auto h-10 w-10 text-slate-400" />
                    <p className="mt-4 text-slate-500">
                      You haven't applied to any jobs yet.
                    </p>
                  </div>
                ) : (
                  applications.map((application) => (
                    <div
                      key={application._id}
                      className="rounded-2xl border bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">
                            {application.job?.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {application.job?.company}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            application.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : application.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {application.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <UserCircleIcon className="h-16 w-16 text-blue-600" />

                <div>
                  <h2 className="text-xl font-semibold">
                    {user?.name || "Student"}
                  </h2>

                  <p className="text-slate-500">{user?.email}</p>

                  <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
