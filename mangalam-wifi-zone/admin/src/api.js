import axios from "axios";

const API_BASE = process.env.REACT_APP_API || "https://mangalam-wifi-zone.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
});

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export default api;