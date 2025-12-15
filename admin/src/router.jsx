import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Coupons from "./pages/Coupons";
import Transactions from "./pages/Transactions";
import RazorpaySettings from "./pages/RazorpaySettings";
import OC200Settings from "./pages/OC200Settings";
import ActivityLogs from "./pages/ActivityLogs";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Router(){
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/plans" element={<ProtectedRoute><Plans/></ProtectedRoute>} />
      <Route path="/coupons" element={<ProtectedRoute><Coupons/></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions/></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
      <Route path="/settings/razorpay" element={<ProtectedRoute><RazorpaySettings/></ProtectedRoute>} />
      <Route path="/settings/oc200" element={<ProtectedRoute><OC200Settings/></ProtectedRoute>} />
      <Route path="/activity" element={<ProtectedRoute><ActivityLogs/></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  );
}