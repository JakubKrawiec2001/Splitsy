import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen wrapper">
      <Sidebar />
      <main className="bg-red-500 basis-5/6 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
