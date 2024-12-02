import React from "react";
import { LoginContext } from "../../login/contexts/login-context";

export const useLogin = () => React.useContext(LoginContext);
