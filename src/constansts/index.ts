import avatar1 from "../assets/images/avatars/avatar-1.png";
import avatar2 from "../assets/images/avatars/avatar-2.png";
import avatar3 from "../assets/images/avatars/avatar-3.png";
import avatar4 from "../assets/images/avatars/avatar-4.png";
import avatar5 from "../assets/images/avatars/avatar-5.png";
import avatar6 from "../assets/images/avatars/avatar-6.png";
import avatar7 from "../assets/images/avatars/avatar-7.png";
import avatar8 from "../assets/images/avatars/avatar-8.png";
import avatar9 from "../assets/images/avatars/avatar-9.png";

import health from "../assets/icons/categories/health.png";
import cafe from "../assets/icons/categories/cafe.png";
import education from "../assets/icons/categories/education.png";
import family from "../assets/icons/categories/family.png";
import gift from "../assets/icons/categories/gift.png";
import house from "../assets/icons/categories/house.png";
import leisure from "../assets/icons/categories/leisure.png";
import other from "../assets/icons/categories/other.png";
import restaurant from "../assets/icons/categories/restaurant.png";
import shopping from "../assets/icons/categories/shopping.png";
import transport from "../assets/icons/categories/transport.png";
import work from "../assets/icons/categories/work.png";
import workout from "../assets/icons/categories/workout.png";

import { MdDashboard } from "react-icons/md";
import { IoIosCard } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { FaWallet } from "react-icons/fa";

export const avatars = [
  {
    url: avatar1,
  },
  {
    url: avatar2,
  },
  {
    url: avatar3,
  },
  {
    url: avatar4,
  },
  {
    url: avatar5,
  },
  {
    url: avatar6,
  },
  {
    url: avatar7,
  },
  {
    url: avatar8,
  },
  {
    url: avatar9,
  },
];

export const navLinks = [
  {
    id: 1,
    label: "Dashboard",
    icon: MdDashboard,
    path: "/",
  },
  {
    id: 2,
    label: "Transactions",
    icon: IoIosCard,
    path: "/transactions",
  },
  {
    id: 3,
    label: "Calendar",
    icon: FaCalendarAlt,
    path: "/calendar",
  },
  {
    id: 4,
    label: "Savings",
    icon: MdSavings,
    path: "/savings",
  },
  {
    id: 5,
    label: "Reports",
    icon: MdAnalytics,
    path: "/reports",
  },
  {
    id: 6,
    label: "My Wallet",
    icon: FaWallet,
    path: "/my-wallet",
  },
];

export const categories = [
  "Health",
  "Leisure",
  "Home",
  "Cafe",
  "Education",
  "Gifts",
  "Groceries",
  "Family",
  "Workout",
  "Transportation",
  "Work",
  "Restaurants",
  "Other",
];
export const iconList = [
  { id: "1", icon: health },
  { id: "2", icon: cafe },
  { id: "3", icon: education },
  { id: "4", icon: family },
  { id: "5", icon: gift },
  { id: "6", icon: house },
  { id: "7", icon: leisure },
  { id: "8", icon: restaurant },
  { id: "9", icon: shopping },
  { id: "10", icon: transport },
  { id: "11", icon: work },
  { id: "12", icon: workout },
  { id: "13", icon: other },
];
