import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../AuthContext/Auth/SignUp";
import SignIn from "../AuthContext/Auth/SignIn";
import CompanyForm from "../components/Company/CompanyForm";
import JobPostForm from "../components/Job/JobPostForm";
import CompanyTable from "../components/Company/CompanyList";
import JobList from "../components/Job/JobList";
import PrivateRoute from "../AuthContext/PrivateRoute";
import Dashboard from "../components/Dashboard";
import DashboardLayout from "../pages/DashboardLayout";

function AppRouters() {
  return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
         <Route
            path="/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            } 
          />

        <Route path="/" element={<SignIn />} />
      </Routes>
  );
}

export default AppRouters;
