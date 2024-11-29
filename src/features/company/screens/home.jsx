import React from "react";
import { Navigate } from "react-router";
import ProtectedRoute from "../../core/components/protected-route";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <Navigate to="/contracts" />
    </ProtectedRoute>
  );
};

export default HomePage;
