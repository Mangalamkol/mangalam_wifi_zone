import { useEffect, useState } from "react";
import { fetchPlans } from "../api/plans";

export default function Plans() {
  const [plans, setPlans] = useState("Loading...");

  useEffect(() => {
    fetchPlans()
      .then(d => setPlans(JSON.stringify(d, null, 2)))
      .catch(e => setPlans("API ERROR: " + e.message));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Plans</h1>
      <pre>{plans}</pre>
    </div>
  );
}
