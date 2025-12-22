export async function fetchDevices(token) {
  const res = await fetch("/api/admin/devices", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function disconnectDevice(mac, token) {
  await fetch("/api/admin/disconnect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mac }),
  });
}
