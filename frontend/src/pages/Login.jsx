import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      await login({
        email,
        password,
      });

      if (JSON.parse(localStorage.getItem("authUser")).role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.25)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_50%)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
              <SparklesIcon className="h-4 w-4" />
              Welcome back
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950">
              Continue building your next chapter.
            </h1>
            <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">
              Access curated opportunities, manage applications, and stay connected with your hiring workflow.
            </p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Why teams love JobSync</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Premium discovery experience</li>
              <li>• AI-powered candidate matching</li>
              <li>• Streamlined recruiter workflows</li>
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Sign in</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-600">Log in to access your dashboard and opportunities.</p>
            </div>

            {error && <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

            <label className="mb-4 block text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                placeholder="you@company.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="mb-4 block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="mb-6 flex items-center justify-between text-sm">
              <span className="text-slate-500">Forgot password?</span>
              <a href="#" className="font-semibold text-blue-600 transition hover:text-blue-700">Reset</a>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Continue
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            <p className="mt-6 text-center text-sm text-slate-500">
              New here? <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
