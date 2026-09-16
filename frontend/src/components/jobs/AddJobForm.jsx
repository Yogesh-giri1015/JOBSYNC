import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const AddJobForm = ({
  title,
  setTitle,
  company,
  setCompany,
  location,
  setLocation,
  salary,
  setSalary,
  saveJob,
  editingId,
  cancelEdit,
  workMode,
  setWorkMode,
  experience,
  setExperience,
  type,
  setType,
  skills,
  setSkills,
  description,
  setDescription,
}) => {
  return (
    <div className="mb-6 lg:mb-0">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.16)] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <BriefcaseIcon className="h-4 w-4" />
              {editingId !== null ? "Update listing" : "Create listing"}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {editingId !== null ? "Update role" : "Post a new role"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Publish opportunities with a polished experience tailored for modern teams.
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 sm:flex">
            <BuildingOffice2Icon className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Job title</span>
            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Company</span>
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Location</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
              <MapPinIcon className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Work mode</span>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Salary</span>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
              <CurrencyDollarIcon className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Salary LPA"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Experience</span>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option>0-1 Years</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Employment type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Skills</span>
            <input
              type="text"
              placeholder="React, Node.js, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>Description</span>
            <textarea
              rows="4"
              placeholder="Write a detailed job description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition duration-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 md:col-span-2 resize-none"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={saveJob}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:bg-blue-700"
          >
            <PlusCircleIcon className="h-4 w-4" />
            {editingId !== null ? "Update role" : "Add role"}
          </button>

          {editingId !== null && (
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddJobForm;
