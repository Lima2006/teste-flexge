import React from "react";

export const LoginContext = React.createContext();

export const LoginContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(localStorage.getItem("token") || null);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};
