import { useEffect, useState } from "react";
import { fetchDevices, disconnectDevice } from "../api/adminDevices";

export default function AdminDashboard() {
  const token = localStorage.getItem("adminToken");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchDevices(token).then(setDevices);
  }, []);

  return (
    <div>
      <h2>Live Devices</h2>
      {devices.map(d => (
        <div key={d.mac}>
          {d.mac} | expires: {new Date(d.expiresAt).toLocaleString()}
          <button onClick={() => disconnectDevice(d.mac, token)}>
            Disconnect
          </button>
        </div>
      ))}
    </div>
  );
}
