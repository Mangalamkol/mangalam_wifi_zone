import React, {useEffect, useState} from "react";
import api from "../api";
import TopBar from "../components/TopBar";
import SideNav from "../components/SideNav";

export default function Coupons(){
  const [coupons,setCoupons] = useState([]);
  const [planId,setPlanId] = useState("");
  const [count,setCount] = useState(100);
  const [plans,setPlans] = useState([]);

  useEffect(()=>{ load(); (async ()=>setPlans((await api.get("/plans")).data))(); },[]);
  async function load(){ setCoupons((await api.get("/coupons")).data); }

  async function generate(){
    await api.post("/coupons/generate",{ planId, count });
    await load();
  }

  return (
    <div className="app">
      <SideNav/>
      <div className="content">
        <TopBar title="Coupons"/>
        <div className="card">
          <h3>Auto Coupon Generator</h3>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <select className="input" value={planId} onChange={e=>setPlanId(e.target.value)}>
              <option value="">Select plan</option>
              {plans.map(p=><option value={p._id} key={p._id}>{p.name}</option>)}
            </select>
            <input className="input" style={{width:120}} value={count} onChange={e=>setCount(parseInt(e.target.value||0))} />
            <button className="btn" onClick={generate}>Generate</button>
          </div>
        </div>

        <div className="card">
          <h3>Coupon List</h3>
          <table className="table">
            <thead><tr><th>Code</th><th>Plan</th><th>Assigned</th><th>Devices</th><th>Expires</th></tr></thead>
            <tbody>
              {coupons.map(c=>(
                <tr key={c._id}>
                  <td>{c.code}</td>
                  <td>{c.plan? c.plan.toString().slice(0,8) : "-"}</td>
                  <td>{c.assignedTo?.phone || "-"}</td>
                  <td>{(c.devicesUsed||[]).length}</td>
                  <td>{c.expiresAt? new Date(c.expiresAt).toLocaleString():"-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}