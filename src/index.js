import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./features/login/screens/login";
import { LoginContextProvider } from "./features/login/contexts/login-context";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./features/company/screens/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </LoginContextProvider>
  </React.StrictMode>
);
