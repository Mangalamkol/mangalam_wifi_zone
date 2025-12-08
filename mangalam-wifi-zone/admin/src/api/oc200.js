import axios from "axios";

const api = axios.create({
  baseURL: "/api/oc200",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Voucher management
export const createVoucher = (code, minutes) => {
  return api.post("/vouchers", { code, durationMinutes: minutes });
};

// User login
export const routerLogin = (mac, voucher) => {
  return api.post("/login", { mac, voucher });
};

// Session management
export const getSessions = () => api.get("/sessions");

// Kick/disconnect user
export const kickUser = (mac) => api.post("/kick", { mac });

// Get Access Points
export const getAps = () => api.get("/aps");
