import adminApi from "../api/adminApi";

export async function adminLogin(username, password) {
  const { data } = await adminApi.post("/api/admin/auth/login", {
    username,
    password,
  });

  localStorage.setItem("adminToken", data.token);
  return data;
}

export function adminLogout() {
  localStorage.removeItem("adminToken");
}

export function isAdminLoggedIn() {
  return !!localStorage.getItem("adminToken");
}