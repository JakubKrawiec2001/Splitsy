import { navLinks } from "@/constansts";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/icons/logo-splitsy.png";
import { RxExit } from "react-icons/rx";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="basis-1/6 bg-customGray p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-1">
          <img src={logo} alt="Splitsy" className="w-[50px]" />
          <p className="text-customBlack font-bold text-2xl">Splitsy</p>
        </div>
        <div className="flex flex-col gap-2 mt-4 pl-4">
          <p className="text-[0.8em] text-[#777] font-semibold mb-2">
            MAIN MENU
          </p>
          {navLinks.map((navLink) => {
            const IconComponent = navLink.icon;
            return (
              <Link
                to={navLink.path}
                key={navLink.id}
                className={`flex items-center gap-4 font-medium text-lg px-4 py-3 rounded-[5px] ${
                  location.pathname === navLink.path
                    ? "bg-customCyan border-r-[6px] border-customBlack text-customBlack cursor-default"
                    : "bg-transparent text-customTextColor hover:bg-[#ddd] transition-colors"
                }`}
              >
                <IconComponent className="text-2xl" />
                {navLink.label}
              </Link>
            );
          })}
        </div>
      </div>
      <p className="flex items-center gap-4 text-customTextColor font-medium text-lg pl-4 py-3 hover:bg-[#ddd] hover:text-customBlack transition-colors rounded-[5px] cursor-pointer">
        <RxExit className="text-2xl" />
        Log Out
      </p>
    </div>
  );
};

export default Sidebar;
