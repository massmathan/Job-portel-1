import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

     useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
      
      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded); 
        setRole(localStorage.getItem("role"));
      } catch {
        setUser(null);
      }
    }
  }, []);


  const login = (userData, token) => {
    console.log("AuthContext login, user:", userData);
    console.log("AuthContext login, token:", token);
   if (userData) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", userData.role);
        setUser(userData);
        setToken(token);
        setRole(userData["users"].role);
        console.log("AuthContext userData:", userData["users"].role);
        console.log("AuthContext localStorage token:", localStorage.getItem("accessToken"));
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setToken(token);
         setRole(userData["users"].role)
        localStorage.setItem("accessToken", token);
        console.log("AuthContext localStorage token:", localStorage.getItem("accessToken"));
      } catch {
        setUser({ username: "Unknown" }); 
      }
    }
    localStorage.setItem("accessToken", token);
    console.log("AuthContext localStorage token:", localStorage.getItem("accessToken"));
  };

  const logout = () => {
        localStorage.removeItem("accessToken");
                localStorage.removeItem("role");


    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
