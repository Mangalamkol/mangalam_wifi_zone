const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchPlans() {
  const res = await fetch(`${API_BASE}/api/plans`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}