import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  // const navigate = useNavigate();

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
        console.log(userData);
        localStorage.setItem("role", userObj.role);
        localStorage.setItem("user", userObj);
        localStorage.setItem("userId", userObj.id);


        setUser(userObj);
        
        console.log(userObj);
        setToken(token);
        setRole(userObj.role);
        setUserId(userObj.id);
        // console.log(userObj.role);

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
        console.log("[AuthContext] localStorage accessToken:", localStorage.getItem("user"));

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

    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setUser(null);
    setRole(localStorage.getItem("role"));
    setToken(localStorage.getItem("accessToken"));
    setUserId(localStorage.getItem("userId"));

    console.log("After logout:");
    console.log("accessToken (storage):", localStorage.getItem("accessToken"));
    console.log("role (storage):", localStorage.getItem("role"));
    console.log("user state:", user);
    console.log("role state:", role);
    console.log("token state:", token);
    console.log("=== LOGOUT END ===");
  };


const validateToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    console.log("currentTime",currentTime);
    if (decoded.exp && decoded.exp < currentTime) {
      if(decoded.exp && ( decoded.exp + 1000 ) > currentTime ){
              console.log("New Token Genereted");
            console.log("decoded ",decoded.exp);
            console.log("after",currentTime);
            return {isFlag:false,redirect:false}; 
      }
      else{
                    console.log("decoded ",decoded.exp);

            console.log("Token expired");
            return {isFlag:false,redirect:true}; 
          // navigate("/signin");
      }
    }

    console.log("Token is valid:", decoded);
    return {isFlag:true,redirect:false};
  } catch (error) {
    console.error("Invalid token:", error);
    return {isFlag:false,redirect:true};  }
};

  return (
    <AuthContext.Provider value={{ user, token, role, userId, validateToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
