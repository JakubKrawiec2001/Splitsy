import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoIosCard } from "react-icons/io";
import { MdSavings } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { Link } from "react-router-dom";

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
          <Link to="/transactions" className="flex items-center gap-2 w-full">
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
  );
};

export default AvatarMenu;
