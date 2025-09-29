import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // Load token from localStorage on mount
  useEffect(() => {
    
    const savedToken = localStorage.getItem("accessToken");
    console.log(savedToken);
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded);
        setRole(localStorage.getItem("role"));
        console.log("[AuthContext] useEffect -> token loaded from storage:", savedToken);
      } catch (err) {
        console.error("[AuthContext] useEffect -> jwtDecode failed:", err);
        setUser(null);
      }
    }
  }, []);


  const login = (userData, token) => {
    console.log("=== LOGIN START ===");
    console.log("userData:", userData);
    console.log("token:", token);

    try {
      if (userData && userData.users) {
        const userObj = userData.users;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", userObj.role);

        setUser(userObj);
        setToken(token);
        setRole(userObj.role);

        console.log("[AuthContext] Logged in user role:", userObj.role);
      } 
      // else {
      //   const decoded = jwtDecode(token);
      //   setUser(decoded);
      //   setToken(token);
      //   localStorage.setItem("accessToken", token);

      //   console.log("[AuthContext] Token decoded user:", decoded);
      // }
    } catch (err) {
      console.error("[AuthContext] Login error:", err);
      setUser({ username: "Unknown" });
    }

    console.log("[AuthContext] localStorage accessToken:", localStorage.getItem("accessToken"));
    console.log("=== LOGIN END ===");
  };

 
  const logout = () => {
    console.log("=== LOGOUT START ===");
    console.log("Before logout:");
    console.log("accessToken (storage):", localStorage.getItem("accessToken"));
    console.log("role (storage):", localStorage.getItem("role"));
    console.log("user state:", user);
    console.log("role state:", role);
    console.log("token state:", token);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    setUser(null);
    setRole(localStorage.getItem("role"));
    setToken(localStorage.getItem("accessToken"));

    console.log("After logout:");
    console.log("accessToken (storage):", localStorage.getItem("accessToken"));
    console.log("role (storage):", localStorage.getItem("role"));
    console.log("user state:", user);
    console.log("role state:", role);
    console.log("token state:", token);
    console.log("=== LOGOUT END ===");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
