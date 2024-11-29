import React from "react";

export const LoginContext = React.createContext();

export const LoginContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY) || null
  );

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};
