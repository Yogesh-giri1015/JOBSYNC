import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AIBadge from "../common/AIBadge";

function SearchBar({ search, setSearch, resultCount }) {
  return (
    <div className="sticky top-4 z-10 rounded-[28px] border border-slate-200 bg-white/95 p-4 shadow-[0_20px_80px_-30px_rgba(15,23,42,0.2)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Discover roles</p>
          <h2 className="text-xl font-semibold text-slate-900">Search the market</h2>
        </div>
        <AIBadge label="AI-powered matching" />
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-slate-50/80 p-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-[20px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, company, or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
          />
        </div>
        <div className="rounded-[20px] bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm">
          {resultCount} match{resultCount !== 1 ? "es" : ""}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
