import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./features/company/screens/home";
import ContractsScreen from "./features/contracts/screens/contracts-screen";
import CreateContractScreen from "./features/contracts/screens/create-contract-screen";
import { LoginContextProvider } from "./features/login/contexts/login-context";
import LoginPage from "./features/login/screens/login-screen";
import "./index.css";
import { store } from "./lib/store";

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
            <Route path="/contracts/new" element={<CreateContractScreen />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </LoginContextProvider>
  </React.StrictMode>
);
