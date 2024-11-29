import { IoMdNotificationsOutline } from "react-icons/io";
import { useUser } from "@/hooks/useUser";
import AddTransactions from "./AddTransactions";
import AvatarMenu from "./AvatarMenu";

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
        <AddTransactions />
        <div className="notification_bell">
          <IoMdNotificationsOutline className="text-[2.6rem] text-customTextColor hover:bg-customGray rounded-full p-1 cursor-pointer" />
        </div>
        <AvatarMenu userAvatar={userData?.avatar} />
      </div>
    </nav>
  );
};

export default Nav;
