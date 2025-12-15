import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBar(){
  const nav = useNavigate()
  function logout(){ localStorage.removeItem('mangalam_admin_token'); nav('/login') }
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold text-lg">Mangalam Admin</div>
      <nav className="p-4 space-y-2">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/plans">Plans</NavLink>
        <NavLink to="/coupons">Coupons</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/logs">Logs</NavLink>
        <button onClick={logout} className="mt-4 text-red-600">Logout</button>
      </nav>
    </aside>
  )
}