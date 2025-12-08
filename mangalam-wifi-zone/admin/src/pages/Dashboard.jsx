import React from "react";
import Plans from "../components/Plans";
import Coupons from "../components/Coupons";
import Transactions from "../components/Transactions";
import OC200 from "../components/OC200";
import APLoadGraph from "../components/APLoadGraph";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Mangalam WiFi Admin Panel</h1>

      <Plans />
      <br />
      <Coupons />
      <br />
      <Transactions />
      <br />

      {/* NEW MODULE */}
      <OC200 />
      <br />
      <APLoadGraph />
    </div>
  );
}
