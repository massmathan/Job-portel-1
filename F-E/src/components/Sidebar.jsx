import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sidebar bg-light p-3" style={{ width: "250px" }}>
      <h4>Job Portal</h4>
      <NavLink to="/dashboard" className="d-block mb-2">
        Dashboard
      </NavLink>
      <NavLink to="/jobs" className="d-block mb-2">
        Jobs
      </NavLink>
      <NavLink to="/job-form" className="d-block mb-2">
        Post Job
      </NavLink>
      <NavLink to="/applications" className="d-block mb-2">
        Applications
      </NavLink>
      <NavLink to="/company-list" className="d-block mb-2">
        Companies
      </NavLink>
    </nav>
  );
}
