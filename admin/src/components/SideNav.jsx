import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideNav() {
  return (
    <div className="side-nav">
      <div className="logo">
        <h2>Admin</h2>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/plans">Plans</NavLink>
          </li>
          <li>
            <NavLink to="/coupons">Coupons</NavLink>
          </li>
          <li>
            <NavLink to="/transactions">Transactions</NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/settings/razorpay">Razorpay Settings</NavLink>
          </li>
          <li>
            <NavLink to="/settings/oc200">OC200 Settings</NavLink>
          </li>
          <li>
            <NavLink to="/activity">Activity Logs</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}