// web_client/src/api/http.js

const API_BASE = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) {
  console.error("❌ VITE_API_BASE_URL is missing");
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`GET ${path} failed`);
  }
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed`);
  }
  return res.json();
}