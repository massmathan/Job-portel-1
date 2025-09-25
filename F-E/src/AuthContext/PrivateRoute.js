import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { user , token } = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />;
}
