import useApplications from "../hooks/useApplications";
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const MyApplications = () => {
  const applications = useApplications();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900">My Applications</h1>

        <p className="mt-2 text-slate-500">
          Track every application you've submitted.
        </p>

        <div className="mt-8 space-y-5">
          {applications.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 shadow text-center">
              <BriefcaseIcon className="mx-auto h-14 w-14 text-slate-300" />

              <h2 className="mt-4 text-2xl font-semibold">
                No Applications Yet
              </h2>
            </div>
          ) : (
            applications
              .filter((application) => application.job)
              .map((application) => (
                <div
                  key={application._id}
                  className="rounded-3xl bg-white p-6 shadow"
                >
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {application.job.title}
                      </h2>

                      <div className="flex items-center gap-2 mt-2 text-slate-500">
                        <BuildingOffice2Icon className="h-4 w-4" />

                        {application.job.company}
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
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
