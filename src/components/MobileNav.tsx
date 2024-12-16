import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosCard } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdSavings } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { useUser } from "@/hooks/useUser";
import { navLinks } from "@/constansts";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import AddTransactions from "./AddTransactions";

const MobileNav = () => {
  const { userData } = useUser();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="flex lg:hidden justify-between items-center">
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userData?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to="/transactions"
                className="flex items-center gap-2 w-full"
              >
                <IoIosCard className="text-lg" />
                Transactions
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/savings" className="flex items-center gap-2 w-full">
                <MdSavings className="text-lg" />
                Savings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/reports" className="flex items-center gap-2 w-full">
                <MdAnalytics className="text-lg" />
                Reports
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AddTransactions />
      </div>
      <Sheet>
        <SheetTrigger>
          <HiMenuAlt3 className="text-4xl text-customBlack" />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between">
          <div className="flex flex-col gap-12">
            <SheetHeader>
              <SheetTitle className="text-left text-customTextColor text-sm font-normal">
                MAIN MENU
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              {navLinks.map((navLink) => {
                const IconComponent = navLink.icon;
                return (
                  <SheetClose asChild key={navLink.id}>
                    <Link
                      to={navLink.path}
                      className={`flex items-center gap-4 font-medium text-base px-4 py-3 rounded-[5px] mb-2 ${
                        location.pathname === navLink.path
                          ? "bg-customCyan border-r-[6px] border-customBlack text-customBlack"
                          : "bg-transparent text-customTextColor"
                      }`}
                    >
                      <IconComponent className="text-xl" />
                      {navLink.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </SheetDescription>
          </div>
          <button
            className="flex items-center gap-3 text-customTextColor font-medium text-base pl-4 py-3 rounded-[5px] cursor-pointer"
            onClick={handleLogout}
          >
            <RxExit className="text-xl" />
            Log Out
          </button>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
