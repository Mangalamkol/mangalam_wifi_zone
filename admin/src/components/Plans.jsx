import React, { useEffect, useState } from "react";
import api from "../api";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ key: "", name: "", price: "", durationMinutes: "", visible: true });

  async function load() {
    const res = await api.get("/admin/plans");
    setPlans(res.data);
  }

  async function save() {
    if (!form.key || !form.name || !form.price || !form.durationMinutes) {
      alert("Please fill all fields");
      return;
    }
    await api.post("/admin/plans", form);
    load();
    setForm({ key: "", name: "", price: "", durationMinutes: "", visible: true });
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Plans</h2>

      <div>
        <input placeholder="Key e.g. 1h" value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} />
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Minutes" type="number" value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })} />
        <button onClick={save}>Save</button>
      </div>

      <br />

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Key</th>
            <th>Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p._id}>
              <td>{p.key}</td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.durationMinutes} mins</td>
              <td>{p.visible ? "Visible" : "Hidden"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
