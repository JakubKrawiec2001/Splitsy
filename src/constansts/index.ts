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
];

export const categories = [
  { id: "1", label: "Health", color: "#E4473F", icon: health },
  { id: "2", label: "Leisure", color: "#63BCA8", icon: leisure },
  { id: "3", label: "Home", color: "#EB8C4F", icon: house },
  { id: "4", label: "Cafe", color: "#A18BD1", icon: cafe },
  { id: "5", label: "Education", color: "#5D93D6", icon: education },
  { id: "6", label: "Gifts", color: "#D06A95", icon: gift },
  { id: "7", label: "Groceries", color: "#74B050", icon: shopping },
  { id: "8", label: "Family", color: "#EAB13D", icon: family },
  { id: "9", label: "Workout", color: "#D57A33", icon: workout },
  { id: "10", label: "Transportation", color: "#496FCB", icon: transport },
  { id: "11", label: "Work", color: "#0FE6DC", icon: work },
  { id: "12", label: "Restaurants", color: "#642979", icon: restaurant },
  { id: "13", label: "Other", color: "#878787", icon: other },
];
