import React from "react";
import { LoginContext } from "../../login/contexts/login-context";
import { useNavigate } from "react-router";
import { api } from "../../../lib/api";

export const AUTH_TOKEN_KEY = "authToken";

export const useLogin = () => {
  const navigate = useNavigate();

  const { user, setUser } = React.useContext(LoginContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const login = async ({ username, password, onSuccess, onError }) => {
    setIsLoading(true);
    try {
      const response = await api.post("/login", { email: username, password });
      const token = response?.data?.token || "";
      setUser({ token });
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      onSuccess?.();
      navigate("/");
    } catch (error) {
      onError?.();
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate("/login");
  };
  return { user, login, logout, isLoading };
};
