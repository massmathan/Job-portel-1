import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function RoleNavbar() {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const menus = {
    ADMIN: [
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/company-list", label: "Companies" },
      { path: "/job-list", label: "Jobs" },
      { path: "/applicants", label: "Applicants" },
      { path: "/settings", label: "Settings" },
    ],
    RECRUITER: [
      { path: "/recruiter/dashboard", label: "Dashboard" },
      { path: "/job-form", label: "Post Job" },
      { path: "/job-list", label: "My Jobs" },
      { path: "/applicants", label: "Applicants" },
    ],
    USER: [
      { path: "/user/dashboard", label: "Dashboard" },
      { path: "/job-list", label: "Browse Jobs" },
      { path: "/apply", label: "Apply" },
      { path: "/applications", label: "My Applications" },
    ],
  };

  const menuItems = menus[role] || [];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link
        className="navbar-brand"
        to={
          role === "ADMIN"
            ? "/admin/dashboard"
            : role === "RECRUITER"
            ? "/recruiter/dashboard"
            : "/user/dashboard"
        }
      >
        {role} Panel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#roleNavbar"
        aria-controls="roleNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="roleNavbar">
        <ul className="navbar-nav me-auto">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <Link className="nav-link" to={item.path}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="navbar-text me-3">
          {user?.username} ({role})
        </span>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
