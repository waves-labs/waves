import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_VERCEL_API_URL ?? "https://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
