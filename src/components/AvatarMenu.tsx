import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoIosSettings, IoIosCard } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";

const AvatarMenu = ({ userAvatar }: { userAvatar: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={userAvatar} />
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
  );
};

export default AvatarMenu;
