import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IoIosSettings,
  IoIosCard,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";

const Nav = () => {
  const { userData } = useUser();
  return (
    <nav className="hidden md:flex justify-between items-center">
      <div className="hidden md:flex flex-col">
        <p className="text-customBlack font-semibold text-2xl">
          Let's manage your finance
        </p>
        <p className="text-customTextColor font-medium capitalize">
          Welcome, {userData?.username}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="notification_bell">
          <IoMdNotificationsOutline className="text-[2.6rem] text-customTextColor hover:bg-customGray rounded-full p-1 cursor-pointer" />
        </div>

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
              <IoIosCard />
              Transactions
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaUserGroup />
              Groups
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaWallet />
              Manage wallets
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IoIosSettings />
              Account settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nav;
