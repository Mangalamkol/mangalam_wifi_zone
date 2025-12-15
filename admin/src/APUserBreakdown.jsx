import React, { useEffect, useState } from "react";
import { getAPBreakdown } from "./oc200Api";

export default function APUserBreakdown() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const res = await getAPBreakdown();
      setData(res.data);
      setError(null); // Clear error on successful fetch
    } catch (err) {
      console.error("Failed to load AP Breakdown:", err);
      setError("Could not refresh AP user data."); // Set a user-friendly error
    } finally {
      // Only set loading to false after the initial fetch attempt
      if (loading) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", marginTop: 30 }}>
      <h2>AP User Breakdown</h2>

      {loading && <p>Loading initial data...</p>}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {!loading && !error && (!data || data.length === 0) && (
        <p>No access points found or no clients are currently connected.</p>
      )}

      {!loading && !error && data && data.length > 0 && data.map((ap, i) => (
        <div key={i} style={{ marginBottom: 25, padding: 10, border: "1px solid #eee" }}>
          <h3>{ap.apName} ({ap.clientCount} users)</h3>
          <div>AP MAC: {ap.apMac}</div>
          <div>AP IP: {ap.apIP}</div>

          {ap.clients && ap.clients.length > 0 ? (
            <table border="1" width="100%" cellPadding="5" style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>MAC</th>
                  <th>IP</th>
                  <th>Hostname</th>
                  <th>Voucher</th>
                  <th>Speed Down</th>
                  <th>Speed Up</th>
                  <th>Signal</th>
                </tr>
              </thead>
              <tbody>
                {ap.clients.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.mac}</td>
                    <td>{c.ipAddress}</td>
                    <td>{c.hostName}</td>
                    <td>{c.voucherCode}</td>
                    <td>{c.downSpeed} kbps</td>
                    <td>{c.upSpeed} kbps</td>
                    <td>{c.signal || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginTop: 10 }}>No clients connected to this AP.</p>
          )}
        </div>
      ))}
    </div>
  );
}
