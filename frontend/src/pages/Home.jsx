import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  CheckCircleIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";
import { fetchJobs } from "../services/jobService";
import { formatSalary } from "../utils/formatSalary";

const Home = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    applications: 0,
  });

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const data = await fetchJobs();
        const uniqueCompanies = new Set(data.map((job) => job.company)).size;
        setJobs(data.slice(0, 6));
        setStats({
          jobs: data.length,
          companies: uniqueCompanies,
          applications: user?.role === "student" ? 0 : 0,
        });
      } catch {
        setJobs([]);
        setStats({ jobs: 0, companies: 0, applications: 0 });
      } finally {
        setLoadingJobs(false);
      }
    };

    loadHomeData();
  }, [user?.role]);

  const featureCards = [
    {
      icon: BriefcaseIcon,
      title: "Verified Jobs",
      text: loadingJobs ? "Loading latest roles..." : `${stats.jobs} active listings`,
    },
    {
      icon: BuildingOffice2Icon,
      title: "Companies Hiring",
      text: loadingJobs ? "Loading company data..." : `${stats.companies} companies`,
    },
    {
      icon: ChartBarIcon,
      title: "Applications",
      text:
        user?.role === "student"
          ? loadingJobs
            ? "Loading your activity..."
            : "Track your submissions"
          : loadingJobs
          ? "Loading..."
          : "Monitor incoming applications",
    },
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Secure Authentication",
      text: "Sign in securely with protected routes and role-aware access.",
    },
    {
      icon: UserGroupIcon,
      title: "Role Based Access",
      text: "Students and recruiters each get a tailored workspace.",
    },
    {
      icon: SparklesIcon,
      title: "AI Career Copilot",
      text: "Explore career support tools designed for your next step.",
    },
    {
      icon: CheckCircleIcon,
      title: "Application Tracking",
      text: "Follow every application from submission to review status.",
    },
  ];

  const howItWorks = [
    {
      title: "Students",
      steps: ["Register", "Browse Jobs", "Apply", "Track Status"],
    },
    {
      title: "Recruiters",
      steps: ["Register", "Post Jobs", "Review Applicants", "Accept or Reject"],
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#f8fafc_100%)] text-slate-900">
      <section className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
              <SparklesIcon className="h-4 w-4" />
              JobSync for placement preparation
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find your next opportunity with JobSync.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Discover verified opportunities, apply instantly, track your applications and manage your career from one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Browse Jobs
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              {user?.role === "recruiter" ? (
                <Link
                  to="/recruiter/dashboard"
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
                >
                  Post a Job
                </Link>
              ) : user?.role === "student" ? (
                <Link
                  to="/student/dashboard"
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)] backdrop-blur">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Platform snapshot</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">Live hiring data</p>
                </div>
                <div className="rounded-2xl bg-purple-50 p-3 text-purple-700">
                  <CpuChipIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm font-medium text-slate-600">Verified jobs</span>
                  <span className="text-base font-semibold text-slate-900">{loadingJobs ? "..." : stats.jobs}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm font-medium text-slate-600">Companies hiring</span>
                  <span className="text-base font-semibold text-slate-900">{loadingJobs ? "..." : stats.companies}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm font-medium text-slate-600">Applications</span>
                  <span className="text-base font-semibold text-slate-900">{loadingJobs ? "..." : stats.applications}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.2)] sm:p-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
              <UserGroupIcon className="h-4 w-4" />
              Built for practical career growth
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A simple path from discovery to placement.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {howItWorks.map((group) => (
              <div key={group.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{group.title}</h3>
                <div className="mt-5 space-y-3">
                  {group.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.2)] sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">Latest opportunities</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900">Fresh roles from the platform</h2>
            </div>
            <Link to="/jobs" className="text-sm font-semibold text-blue-600">
              View All
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {loadingJobs ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="mt-4 h-5 w-40 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-32 rounded bg-slate-200" />
                  <div className="mt-4 h-10 w-full rounded bg-slate-200" />
                </div>
              ))
            ) : jobs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 lg:col-span-2">
                No jobs available right now.
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                        <BuildingOffice2Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{job.title}</h3>
                        <p className="text-sm text-slate-500">{job.company}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                      {job.workMode}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="rounded-full bg-white px-3 py-1 shadow-sm">{job.location}</span>
                    <span className="rounded-full bg-white px-3 py-1 shadow-sm">{formatSalary(job.salary)}</span>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <Link to="/jobs" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Apply
                    </Link>
                    <Link to="/jobs" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600">
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>JobSync</p>
          <div className="flex flex-wrap gap-4">
            <span>Built using React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
          </div>
          <p>Made for placement preparation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
