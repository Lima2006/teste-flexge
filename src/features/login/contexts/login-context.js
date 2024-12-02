import React from "react";
import { api } from "../../../lib/api";

export const LoginContext = React.createContext();

export const LoginContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(
    localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY) || null
  );

  const login = async ({ username, password, onSuccess, onError }) => {
    setIsLoading(true);
    try {
      const response = await api.post("/login", { email: username, password });
      const token = response?.data?.token || "";
      setUser({ token });
      localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY, token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      onSuccess?.();
    } catch (error) {
      onError?.();
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_KEY);
    window.location.href = "/";
  };

  return (
    <LoginContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, login, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
};
