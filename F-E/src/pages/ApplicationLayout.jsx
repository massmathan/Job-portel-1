import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Others/Sidebar";
import Navbars from "../components/Navbars";
import CompanyForm from "../components/Company/CompanyForm";
import JobPostForm from "../components/Job/JobPostForm";
import CompanyTable from "../components/Company/CompanyList";
import JobList from "../components/Job/JobList";
import SettingsForm from "../components/SettingsForm";
import { useContext, useState } from "react";
import ApplicantList from "../components/Applicant/ApplicantList";
import ApplicantForm from "../components/Applicant/ApplicantForm";
import RecruiterDashboard from "./RecruiterDashboard";
import AdminDashboard from "./AdminDashboard";
import ApplicantDashboard from "./ApplicantDashboard";
import PrivateRoute from "../AuthContext/PrivateRoute";
import { AuthContext } from "../AuthContext/AuthContext";
import AnalyticsDashboard from "./AnalyticsDashboard";
import JobDetailCard from "../components/Job/JobDetailCard";

export default function DashboardLayout() {
    const { user, role, logout } = useContext(AuthContext);
  
  const [applications, setApplications] = useState([]);

  return (
    <div className="d-flex flex-column w-100 vh-100">
      <Navbars />

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* <div className="d-none d-md-block">
          <Sidebar />
        </div> */}

        <main className="flex-grow-1 p-3 p-md-4 overflow-auto">
          <Routes>
            <Route path="/company-list" element={<CompanyTable />} />
            <Route path="/company-form" element={<CompanyForm />} />
            <Route path="/company-form/:id" element={<CompanyForm />} />

            <Route path="/job-form" element={<JobPostForm />} />
            <Route path="/job-form/:id" element={<JobPostForm />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/job-view/:id" element={<JobDetailCard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />

            <Route path="/settings" element={<SettingsForm />} />

            <Route path="/apply/:id" element={<ApplicantForm />} />
            <Route path="/applicants-list" element={<ApplicantList applications={applications} />} />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute role="ADMIN">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/recruiter/dashboard"
              element={
                <PrivateRoute role="RECRUITER">
                  <RecruiterDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute role="USER">   
                  <ApplicantDashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to={ role === "ADMIN"
            ? "/admin/dashboard"
            : role === "RECRUITER"
            ? "/recruiter/dashboard"
            : "/user/dashboard"} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
