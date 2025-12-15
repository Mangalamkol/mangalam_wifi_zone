import React, {useEffect, useState} from "react";
import api from "../api";
import TopBar from "../components/TopBar";
import SideNav from "../components/SideNav";

export default function Plans(){
  const [plans,setPlans] = useState([]);
  const [form,setForm] = useState({name:"",price:0,durationHours:1,deviceLimit:1});
  useEffect(()=>load(),[]);
  async function load(){ const {data} = await api.get("/plans"); setPlans(data); }
  async function create(){ await api.post("/plans", form); setForm({name:"",price:0,durationHours:1,deviceLimit:1}); load(); }
  async function remove(id){ if(!confirm("Delete plan?")) return; await api.delete(`/plans/${id}`); load(); }

  return (
    <div className="app">
      <SideNav/>
      <div className="content">
        <TopBar title="Manage Plans"/>
        <div className="card">
          <h3>Create Plan</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 120px 120px 120px",gap:8}}>
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="input" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:parseFloat(e.target.value||0)})} />
            <input className="input" placeholder="Hours" value={form.durationHours} onChange={e=>setForm({...form,durationHours:parseInt(e.target.value||1)})} />
            <input className="input" placeholder="Device limit" value={form.deviceLimit} onChange={e=>setForm({...form,deviceLimit:parseInt(e.target.value||1)})} />
          </div>
          <div style={{marginTop:8}}><button className="btn" onClick={create}>Create</button></div>
        </div>

        <div className="card">
          <h3>Existing Plans</h3>
          <table className="table">
            <thead><tr><th>Name</th><th>Price</th><th>Hours</th><th>Devices</th><th></th></tr></thead>
            <tbody>
              {plans.map(p=>(
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.durationHours}</td>
                  <td>{p.deviceLimit}</td>
                  <td><button className="btn" onClick={()=>remove(p._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}