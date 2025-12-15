import React, { useState } from "react";
import api from "../api";

export default function Login({ setLogged }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    try {
      const response = await api.post("/admin/login", { user, pass });
      const { accessToken } = response.data;
      localStorage.setItem("admin_token", accessToken);
      setLogged(true);
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 50 }}>
      <h2>Admin Login</h2>
      <input placeholder="username" onChange={(e) => setUser(e.target.value)} />
      <br />
      <input type="password" placeholder="password" onChange={(e) => setPass(e.target.value)} />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={submit}>Login</button>
    </div>
  );
}
