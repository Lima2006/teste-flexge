import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./features/login/screens/login";
import { LoginContextProvider } from "./features/login/contexts/login-context";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./features/company/screens/home";
import ContractsScreen from "./features/contracts/screens/contracts-screen";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contracts" element={<ContractsScreen />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </LoginContextProvider>
  </React.StrictMode>
);
