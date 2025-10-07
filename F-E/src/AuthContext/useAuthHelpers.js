import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import ApiService from "../Service/ApiService";

 

export const useAuthHelpers = () => {
  const { validateToken, user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  let refreshTokens = ''; 

  const refreshToken = async (token) => {
    const tokenResponse = validateToken(token);
    console.log("isFlagi", tokenResponse.isFlag);

    if (!tokenResponse.isflag && !tokenResponse.redirect) {
      const credentials = {
        email: user.email,
        password: user.decodePassword,
      };
      const response = await ApiService.post("/auth/refreshTokens", credentials);
      console.log("Server Response:", response.data);

      const { accessToken, users } = response.data;
      users.decodePassword = user.decodePassword;
      token = accessToken;
      refreshTokens = accessToken;
      login({ users }, accessToken);
    } else {
      navigate("/signin");
    }
  };

  return { refreshTokens , refreshToken };
};
