const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function startSession(mac, plan) {
  const res = await fetch(`${API_BASE}/api/v1/session/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mac, plan }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(errorData.message || "Failed to start session");
  }

  return res.json();
}
