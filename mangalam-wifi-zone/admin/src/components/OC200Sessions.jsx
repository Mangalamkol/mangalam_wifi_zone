import React, { useEffect, useState } from "react";
import { getSessions, kickUser } from "../api/oc200";

export default function OC200Sessions() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    try {
      const res = await getSessions();
      setList(res.data || []); // Ensure list is always an array
      setError(null);
    } catch (err) {
      console.error("Failed to load sessions:", err);
      setError("Failed to load session data. Please check the connection.");
    } finally {
      setLoading(false);
    }
  }

  async function handleKick(mac) {
    if (!window.confirm(`Are you sure you want to disconnect user ${mac}?`)) return;

    try {
      const res = await kickUser(mac);
      if (res.data.success) {
        alert(res.data.message);
        loadData(); // Refresh list on success
      } else {
        alert(`Failed to disconnect: ${res.data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Kick user error:", err);
      const errorMessage = err.response?.data?.error || "An unexpected server error occurred.";
      alert(`Error: ${errorMessage}`);
    }
  }

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 7000); // Polling every 7 seconds
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: 20, border: "1px solid #eee", marginTop: 30, borderRadius: 8 }}>
      <h2 style={{ marginBottom: 20 }}>OC200 Active Sessions</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={styles.th}>MAC Address</th>
            <th style={styles.th}>IP Address</th>
            <th style={styles.th}>Hostname</th>
            <th style={styles.th}>Voucher</th>
            <th style={styles.th}>Download (kbps)</th>
            <th style={styles.th}>Upload (kbps)</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.length > 0 ? (
            list.map((d) => (
              <tr key={d.mac} style={styles.tr}>
                <td style={styles.td}>{d.mac}</td>
                <td style={styles.td}>{d.ip || "N/A"}</td>
                <td style={styles.td}>{d.name || "N/A"}</td>
                <td style={styles.td}>{d.voucherCode || "-"}</td>
                <td style={styles.td}>{(d.downSpeed / 1024).toFixed(2)}</td>
                <td style={styles.td}>{(d.upSpeed / 1024).toFixed(2)}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleKick(d.mac)}
                    style={styles.kickButton}
                  >
                    Kick
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No active sessions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  kickButton: {
    backgroundColor: "#e74c3c", // A slightly softer red
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s",
  },
};
