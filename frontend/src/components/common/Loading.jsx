import {
  ArrowPathIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ArrowPathIcon className="h-7 w-7 animate-spin" />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-slate-900">
          Preparing your opportunities
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          We are loading curated roles and insights for you.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700">
          <SparklesIcon className="h-4 w-4" />
          AI-assisted matching is warming up
        </div>
      </div>
    </div>
  );
}

export default Loading;
