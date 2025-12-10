import React, { useEffect, useState } from "react";
import api from "../api";

export default function Transactions() {
  const [list, setList] = useState([]);

  async function load() {
    const res = await api.get("/razorpay/all").catch(() => ({ data: [] }));
    setList(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t) => (
            <tr key={t._id}>
              <td>{t.razorpayPaymentId}</td>
              <td>₹{t.amount}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
