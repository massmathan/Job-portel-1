import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { user, token } = useContext(AuthContext);

    // userRole = user['users']['role'];
    // console.log("Mathan",role);
    // console.log("Mathan",token);
    // console.log("Mathan",user);
    // console.log("Mathan",userRole);
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // if (role && userRole !== role) {
  //   switch (user.role) {
  //     case "ADMIN":
  //       return <Navigate to="/admin/dashboard" replace />;
  //     case "RECRUITER":
  //       return <Navigate to="/recruiter/dashboard" replace />;
  //     case "USER":
  //       return <Navigate to="/user/dashboard" replace />;
  //     default:
  //       return <Navigate to="/signin" replace />;
  //   }
  // }

  // If no role restriction or role matches, render the children components
  return children;
}
