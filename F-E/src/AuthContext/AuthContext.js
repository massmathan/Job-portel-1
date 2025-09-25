import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);

     useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);

      try {
        const decoded = jwtDecode(savedToken);
        setUser(decoded); 
      } catch {
        setUser(null);
      }
    }
  }, []);


  const login = (userData, token) => {
    console.log("AuthContext login, user:", userData);
    console.log("AuthContext login, token:", token);
   if (userData) {
      setUser(userData);
        setToken(token);
    } else {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setToken(token);
      } catch {
        setUser({ username: "Unknown" }); 
      }
    }
    localStorage.setItem("accessToken", token);
    console.log("AuthContext localStorage token:", localStorage.getItem("accessToken"));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
