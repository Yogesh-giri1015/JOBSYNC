import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleRoute from "../components/common/RoleRoute";
import Applicants from "../pages/Applicants";
import MyApplications from "../pages/MyApplications";
const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const StudentDashboard = lazy(() => import("../pages/StudentDashboard"));
const RecruiterDashboard = lazy(() => import("../pages/RecruiterDashboard"));
const AICareerAssistant = lazy(() => import("../pages/AICareerAssistant"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500 font-medium">
          Loading...
        </div>
      }
    >
      <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/jobs" element={<Jobs />} />

      {/* <Route path="/jobs/:id" element={<JobDetails />} /> */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/student/dashboard"
        element={
          <RoleRoute role="student">
            <StudentDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/recruiter/dashboard"
        element={
          <RoleRoute role="recruiter">
            <RecruiterDashboard />
          </RoleRoute>
        }
      />
      <Route path="/recruiter/jobs/:jobId" element={<Applicants />} />
      <Route path="/applications" element={<MyApplications />} />
      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <AICareerAssistant />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
};

export default AppRoutes;
