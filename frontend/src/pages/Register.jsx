import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      await register(formData);

      if (formData.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_50%)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-700">
              <SparklesIcon className="h-4 w-4" />
              New to JobSync
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
              Create a profile that stands out.
            </h1>
            <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">
              Join the modern hiring workspace for ambitious candidates and high-signal recruiting teams.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">What you get</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Curated job discovery</li>
              <li>• Streamlined profile setup</li>
              <li>• Recruiter-ready workflows</li>
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Create account</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">Set up your workspace</h2>
              <p className="mt-2 text-sm text-slate-600">Start with a polished profile and get onboarded in minutes.</p>
            </div>

            {error && <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

            <label className="mb-4 block text-sm font-medium text-slate-700">
              Full name
              <input
                type="text"
                name="name"
                placeholder="Alex Johnson"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                required
              />
            </label>

            <label className="mb-4 block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                name="email"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                required
              />
            </label>

            <label className="mb-4 block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                required
              />
            </label>

            <label className="mb-6 block text-sm font-medium text-slate-700">
              Role
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
              >
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Create account
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;