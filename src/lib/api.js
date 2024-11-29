import axios from "axios";
import { AUTH_TOKEN_KEY } from "../features/core/hooks/use-login";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}` },
});
