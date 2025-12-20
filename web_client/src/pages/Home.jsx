import { useEffect, useState } from "react";
import { fetchPlans } from "../api/plans";

export default function Home() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlans()
      .then(data => {
        setPlans(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load plans");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>📶 Mangalam WiFi Plans</h1>

      {loading && <p>Loading plans...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {plans.map(plan => (
          <li key={plan._id} style={{ marginBottom: 12 }}>
            <strong>{plan.name}</strong> — ₹{plan.price} ({plan.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}