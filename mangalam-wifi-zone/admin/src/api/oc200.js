import axios from "axios";

const api = axios.create({
  baseURL: "/api/oc200",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSessions = () => api.get("/sessions");

export const kickUser = (mac) => api.post("/kick", { mac });
