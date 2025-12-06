import React, { useEffect, useState } from "react";
import { getSessions } from "../api/oc200";

export default function OC200Sessions() {
  const [list, setList] = useState([]);

  async function loadData() {
    const res = await getSessions();
    setList(res.data);
  }

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 5000); // auto-refresh every 5 sec
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 20, border: "1px solid #eee", marginTop: 30 }}>
      <h2>OC200 Active Sessions</h2>

      {list.length === 0 && <div>No Active Users</div>}

      <table border="1" cellPadding="5" style={{ width: "100%", marginTop: 15 }}>
        <thead>
          <tr>
            <th>MAC</th>
            <th>IP</th>
            <th>Hostname</th>
            <th>Voucher</th>
            <th>Download</th>
            <th>Upload</th>
            <th>Connected Since</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d, i) => (
            <tr key={i}>
              <td>{d.mac || "—"}</td>
              <td>{d.ipAddress || "—"}</td>
              <td>{d.hostName || "—"}</td>
              <td>{d.voucherCode || "—"}</td>
              <td>{d.downSpeed || 0} kbps</td>
              <td>{d.upSpeed || 0} kbps</td>
              <td>{new Date(d.connectedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}