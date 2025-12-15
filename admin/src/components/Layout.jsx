import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <TopBar />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
