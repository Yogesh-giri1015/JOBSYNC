import { SparklesIcon } from "@heroicons/react/24/outline";

function AIBadge({ label = "AI-powered" }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-700 shadow-sm shadow-purple-100">
      <SparklesIcon className="h-4 w-4" />
      {label}
    </div>
  );
}

export default AIBadge;
