import { useEffect, useState } from "react";

export default function ApiTest() {
  const [status, setStatus] = useState("Checking API...");

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => {
        setStatus("✅ API Connected: " + data.status);
      })
      .catch(() => {
        setStatus("❌ API Connection Failed");
      });
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>API Test</h1>
      <p>{status}</p>
    </div>
  );
}