import React, { useState } from "react";
import api from "../api";

export default function Coupons() {
  const [file, setFile] = useState(null);
  const [planKey, setPlanKey] = useState("");
  const [maxDevices, setMaxDevices] = useState(1);

  async function upload() {
    if (!file || !planKey) {
      alert("Please select a file and enter a plan key.");
      return;
    }

    const form = new FormData();
    form.append("pdf", file);
    form.append("planKey", planKey);
    form.append("maxDevices", maxDevices);

    try {
      const res = await api.post("/coupons/upload", form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Imported: " + res.data.imported);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  }

  return (
    <div>
      <h2>Coupon Upload</h2>

      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <br />
      <br />
      <input placeholder="Plan Key" value={planKey} onChange={(e) => setPlanKey(e.target.value)} />
      <br />
      <br />
      <input type="number" placeholder="Max Devices" value={maxDevices} onChange={(e) => setMaxDevices(e.target.value)} />
      <br />
      <br />
      <button onClick={upload}>Upload PDF</button>
    </div>
  );
}
