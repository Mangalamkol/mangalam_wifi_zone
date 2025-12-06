import React, { useState } from "react";
import { createVoucher, routerLogin } from "../oc200Api";

export default function OC200() {
  const [voucher, setVoucher] = useState("");
  const [duration, setDuration] = useState(60);
  const [mac, setMac] = useState("");
  const [loginVoucher, setLoginVoucher] = useState("");

  async function genVoucher() {
    if (!voucher) return alert("Enter voucher code");
    const res = await createVoucher(voucher, duration);
    alert("Voucher created:\n" + JSON.stringify(res.data));
  }

  async function loginTest() {
    const res = await routerLogin(mac, loginVoucher);
    alert("Login Response:\n" + JSON.stringify(res.data));
  }

  return (
    <div style={{ padding: 20, border: "1px solid #ddd", marginTop: 20 }}>
      <h2>OC200 Panel</h2>

      {/* CREATE VOUCHER */}
      <h3>Create Voucher</h3>
      <input
        placeholder="Voucher Code"
        onChange={(e) => setVoucher(e.target.value)}
      />
      <br />
      <input
        placeholder="Minutes"
        type="number"
        onChange={(e) => setDuration(e.target.value)}
      />
      <br />
      <button onClick={genVoucher}>Generate Voucher</button>

      <hr />

      {/* LOGIN TEST */}
      <h3>Router Login Test</h3>
      <input placeholder="Device MAC" onChange={(e) => setMac(e.target.value)} />
      <br />
      <input
        placeholder="Voucher"
        onChange={(e) => setLoginVoucher(e.target.value)}
      />
      <br />
      <button onClick={loginTest}>Test Login</button>
    </div>
  );
}
