import React from "react";
import LoginForm from "../components/login-form";

const LoginScreen = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="bg-white w-full p-8 pt-4 border rounded-lg drop-shadow-md max-w-[400px]">
        <h3 className="text-3xl mb-8 text-center">Login</h3>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;
