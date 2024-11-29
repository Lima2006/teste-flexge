import React from "react";
import { Navigate } from "react-router";
import { useLogin } from "../../core/hooks/use-login";

const ProtectedRoute = ({ children }) => {
  const { user } = useLogin();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
