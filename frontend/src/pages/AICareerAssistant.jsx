import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ClipboardDocumentIcon,
  DocumentArrowUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import api from "../services/api";

const AICareerAssistant = () => {
  const [activeTab, setActiveTab] = useState("interview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interviewData, setInterviewData] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeResult, setResumeResult] = useState(null);
  const [form, setForm] = useState({
    role: "",
    experience: "",
    company: "",
    jobDescription: "",
    candidateName: "",
    jobDescriptionForResume: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/api/ai/interview", {
        role: form.role,
        experience: form.experience,
      });
      setInterviewData(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleCoverLetterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/api/ai/cover-letter", {
        company: form.company,
        role: form.role,
        jobDescription: form.jobDescription,
        candidateName: form.candidateName,
      });
      setCoverLetter(data.coverLetter || "");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!resumeFile) {
      setError("Please upload a PDF resume.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      if (form.jobDescriptionForResume) {
        formData.append("jobDescription", form.jobDescriptionForResume);
      }

      const { data } = await api.post("/api/ai/resume-match", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const copyCoverLetter = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
    } catch {
      // Ignore clipboard permission issues and keep the page usable.
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_80px_-35px_rgba(15,23,42,0.25)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-700">
                <SparklesIcon className="h-4 w-4" />
                AI Career Assistant
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Prepare smarter for every opportunity.
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Generate interview questions, draft a polished cover letter and evaluate your resume against a role.
              </p>
            </div>
            <Link to="/jobs" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
              Browse Jobs
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "interview", label: "Interview Questions" },
              { id: "cover-letter", label: "Cover Letter" },
              { id: "resume", label: "Resume Match" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {activeTab === "interview" && (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Create interview prep</h2>
              <form onSubmit={handleInterviewSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="Software Engineer"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Experience Level</label>
                  <input
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="2 years"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {loading ? "Generating..." : "Generate Questions"}
                </button>
              </form>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : interviewData?.questions?.length ? (
                <div className="space-y-4">
                  {interviewData.questions.map((item, index) => (
                    <div key={index} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-blue-600">{index + 1}. {item.question}</p>
                          <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                          {item.difficulty}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">Tip: {item.interviewTips}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  Your generated interview questions will appear here.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "cover-letter" && (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Draft a cover letter</h2>
              <form onSubmit={handleCoverLetterSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Company</label>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="Microsoft"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                  <input
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="Product Manager"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Candidate Name</label>
                  <input
                    value={form.candidateName}
                    onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="Aarav Sharma"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Job Description</label>
                  <textarea
                    value={form.jobDescription}
                    onChange={(e) => setForm({ ...form, jobDescription: e.target.value })}
                    className="min-h-36 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="Paste the job description here"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {loading ? "Generating..." : "Generate Cover Letter"}
                </button>
              </form>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : coverLetter ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Generated Cover Letter</h3>
                    <button
                      onClick={copyCoverLetter}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                    >
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      Copy
                    </button>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 whitespace-pre-line text-sm leading-7 text-slate-700">
                    {coverLetter}
                  </div>
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  Your generated cover letter will appear here.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "resume" && (
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Compare your resume</h2>
              <form onSubmit={handleResumeSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Upload PDF Resume</label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    <DocumentArrowUpIcon className="mb-3 h-8 w-8 text-blue-600" />
                    <span>{resumeFile ? resumeFile.name : "Click to upload your resume"}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Optional Job Description</label>
                  <textarea
                    value={form.jobDescriptionForResume}
                    onChange={(e) => setForm({ ...form, jobDescriptionForResume: e.target.value })}
                    className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0"
                    placeholder="Paste the role description if available"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-70"
                >
                  {loading ? "Analyzing..." : "Generate Match Report"}
                </button>
              </form>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : resumeResult ? (
                <div className="space-y-5">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-medium text-slate-500">Match Score</p>
                    <p className="mt-2 text-4xl font-semibold text-blue-600">{resumeResult.matchScore}%</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Strengths</h3>
                    <ul className="mt-3 space-y-2">
                      {resumeResult.strengths?.map((item, index) => (
                        <li key={index} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Weaknesses</h3>
                    <ul className="mt-3 space-y-2">
                      {resumeResult.weaknesses?.map((item, index) => (
                        <li key={index} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Missing Skills</h3>
                    <ul className="mt-3 space-y-2">
                      {resumeResult.missingSkills?.map((item, index) => (
                        <li key={index} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Recommendations</h3>
                    <ul className="mt-3 space-y-2">
                      {resumeResult.recommendations?.map((item, index) => (
                        <li key={index} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-slate-300 p-8 text-center text-slate-500">
                  Upload your resume to see a match analysis.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerAssistant;
