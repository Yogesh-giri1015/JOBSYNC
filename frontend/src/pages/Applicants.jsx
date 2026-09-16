import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useApplicants from "../hooks/useApplicants";
import {
  UserCircleIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  acceptApplication,
  rejectApplication,
} from "../services/applicationService";
const Applicants = () => {
  const { jobId } = useParams();
  const { applicants, setApplicants } = useApplicants(jobId);
  async function handleAccept(id) {
    try {
      await acceptApplication(id);

      setApplicants((prev) =>
        prev.map((application) =>
          application._id === id
            ? { ...application, status: "Accepted" }
            : application,
        ),
      );

      toast.success("Application accepted.");
    } catch {
      toast.error("Unable to accept this application right now.");
    }
  }

  async function handleReject(id) {
    try {
      await rejectApplication(id);

      setApplicants((prev) =>
        prev.map((application) =>
          application._id === id
            ? { ...application, status: "Rejected" }
            : application,
        ),
      );

      toast.success("Application rejected.");
    } catch {
      toast.error("Unable to reject this application right now.");
    }
  }
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Applicants</h1>

          <p className="mt-2 text-slate-500">
            Review candidates who applied for this position.
          </p>
        </div>

        {/* Empty State */}
        {applicants.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 shadow text-center">
            <UserCircleIcon className="mx-auto h-20 w-20 text-slate-300" />

            <h2 className="mt-5 text-2xl font-semibold text-slate-700">
              No Applicants Yet
            </h2>

            <p className="mt-2 text-slate-500">
              Once students apply, they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {applicants.map((application) => (
              <div
                key={application._id}
                className="rounded-3xl bg-white p-6 shadow hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                      <UserCircleIcon className="h-8 w-8 text-blue-600" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        {application.student.name}
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-slate-500">
                        <EnvelopeIcon className="h-4 w-4" />

                        {application.student.email}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
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

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ClockIcon className="h-4 w-4" />
                    Applied recently
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccept(application._id)}
                      className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleReject(application._id)}
                      className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;
