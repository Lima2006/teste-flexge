import React from "react";
import { Navigate } from "react-router";
import { LoginContext } from "../../login/contexts/login-context";
import { Button } from "antd";

const HomePage = () => {
  const { user, setUser } = React.useContext(LoginContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Button type="primary" onClick={() => setUser(null)}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
