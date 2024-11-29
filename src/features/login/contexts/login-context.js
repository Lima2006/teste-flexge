import React from "react";
import { AUTH_TOKEN_KEY } from "../../core/hooks/use-login";

export const LoginContext = React.createContext();

export const LoginContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    localStorage.getItem(AUTH_TOKEN_KEY) || null
  );

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};
