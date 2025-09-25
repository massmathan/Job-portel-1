import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbars from "../components/Navbars";
import CompanyForm from "../components/Company/CompanyForm";
import JobPostForm from "../components/Job/JobPostForm";
import CompanyTable from "../components/Company/CompanyList";
import JobList from "../components/Job/JobList";
import SettingsForm from "../components/SettingsForm";
import { useState } from "react";
import ApplicationsDashboard from "../components/ApplicationsDashboard";
import ApplicantForm from "../components/ApplicantForm";



export default function DashboardLayout() {
      const [applications, setApplications] = useState([]);

  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbars />
        <main className="p-4 ">
          <Routes>
            <Route path="/company-list" element={<CompanyTable />} />
            <Route path="/company-form" element={<CompanyForm />} />
            <Route path="/company-form/:id" element={<CompanyForm />} />
            <Route path="/job-form" element={<JobPostForm />} />
            <Route path="/job-form/:id" element={<JobPostForm />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/settings" element={<SettingsForm />} />
            <Route path="/dashboard" element={<h2>Welcome to the Dashboard</h2>} />
            <Route
          path="/apply"
          element={<ApplicantForm setApplications={setApplications} applications={applications} />}
        />
        <Route
          path="/applications"
          element={<ApplicationsDashboard applications={applications} />}
        />
        <Route path="*" element={<Navigate to="/apply" />} />

            {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
