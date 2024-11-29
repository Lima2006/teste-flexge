import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY)}` },
});
