import React, { useEffect, useState } from "react";
import { getSessions } from "../api/oc200";
import { kickUser } from "../api/oc200";

export default function OC200Sessions() {
  const [list, setList] = useState([]);

  async function loadData() {
    const res = await getSessions();
    setList(res.data);
  }

  async function kick(mac) {
    if (!window.confirm("Disconnect user?")) return;

    const res = await kickUser(mac);

    alert("User disconnected: " + mac);
    loadData();
  }

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: 20, border: "1px solid #eee", marginTop: 30 }}>
      <h2>OC200 Active Sessions</h2>

      <table border="1" width="100%" cellPadding="5">
        <thead>
          <tr>
            <th>MAC</th>
            <th>IP</th>
            <th>Hostname</th>
            <th>Voucher</th>
            <th>Download</th>
            <th>Upload</th>
            <th>Kick</th>
          </tr>
        </thead>

        <tbody>
          {list.map((d, i) => (
            <tr key={i}>
              <td>{d.mac}</td>
              <td>{d.ipAddress}</td>
              <td>{d.hostName}</td>
              <td>{d.voucherCode}</td>
              <td>{d.downSpeed} kbps</td>
              <td>{d.upSpeed} kbps</td>
              <td>
                <button
                  onClick={() => kick(d.mac)}
                  style={{ background: "red", color: "white" }}
                >
                  Kick
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}