import api from "./api";

export async function createVoucher(code, minutes) {
  return api.post("/oc200/vouchers", { code, durationMinutes: minutes });
}

export async function routerLogin(mac, voucher) {
  return api.post("/oc200/login", { mac, voucher });
}

export async function getSessions() {
  return api.get("/oc200/sessions");
}
