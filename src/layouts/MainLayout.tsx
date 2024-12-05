import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen wrapper bg-customGray">
      <Sidebar />
      <main className="w-full p-4 md:py-6 md:px-8 flex flex-col gap-6 h-screen overflow-y-auto custom-scroll">
        <Nav />
        <MobileNav />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
