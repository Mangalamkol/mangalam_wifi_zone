import { adminLogout } from "../../services/adminAuth";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <button
        onClick={() => {
          adminLogout();
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}