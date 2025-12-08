import React, { useEffect, useState } from "react";
import { getAPs } from "../oc200Api";

export default function APInfo() {
  const [aps, setAps] = useState([]);

  async function load() {
    try {
      const res = await getAPs();
      setAps(res.data);
    } catch (error) {
      console.error("Failed to load APs:", error);
      // Optionally, you could set an error state here to display in the UI
    }
  }

  useEffect(() => {
    load();
    const timer = setInterval(load, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ marginTop: 30, padding: 20, border: "1px solid #ddd" }}>
      <h2>Access Points (AP) Status</h2>

      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>MAC</th>
            <th>IP</th>
            <th>Channel</th>
            <th>Clients</th>
            <th>Status</th>
            <th>Uptime</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(aps) && aps.map((ap, i) => (
            <tr key={i}>
              <td>{ap.name}</td>
              <td>{ap.model}</td>
              <td>{ap.mac}</td>
              <td>{ap.ip}</td>
              <td>{ap.channel}</td>
              <td>{ap.clientCount}</td>
              <td style={{ color: ap.isUp ? "green" : "red" }}>
                {ap.isUp ? "Online" : "Offline"}
              </td>
              <td>{Math.round(ap.uptime / 3600)} hrs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
