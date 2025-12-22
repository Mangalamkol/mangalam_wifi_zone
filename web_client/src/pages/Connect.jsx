import { useEffect, useState } from "react";
import { getClientMac } from "../utils.js";
import { fetchPlans } from "../api/plans";
import { startSession } from "../api/session";

export default function Connect() {
  const [mac, setMac] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setMac(getClientMac());
    fetchPlans().then(setPlans);
  }, []);

  async function connect(plan) {
    await startSession(mac, plan);
    alert("Internet Connected");
  }

  return (
    <>
      <h2>Your MAC: {mac}</h2>
      {plans.map(p => (
        <button key={p.id} onClick={() => connect(p)}>
          {p.name}
        </button>
      ))}
    </>
  );
}
