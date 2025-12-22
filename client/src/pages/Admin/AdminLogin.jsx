import { useState } from "react";
import { adminLogin } from "../../services/adminAuth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await adminLogin(username, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "100px auto" }}>
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}