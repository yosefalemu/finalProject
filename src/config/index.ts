import { TSidebarItemsType } from "@/types";
import {
  Home,
  UserRound,
  AlignLeft,
  Building2,
  Briefcase,
  Users,
  MessageSquareMore,
  ShieldPlus,
  MessageSquareText,
  ScrollText,
} from "lucide-react";

export const MainSidebarComponents: TSidebarItemsType[] = [
  { name: "Home", url: "Home", icon: Home, role: ["screener", "manager"] },
  {
    name: "Profile",
    url: "Profile",
    icon: UserRound,
    role: ["screener", "manager"],
  },
  {
    name: "Applications",
    url: "Applications",
    icon: AlignLeft,
    role: ["screener"],
  },
  {
    name: "Applications",
    url: "managerApplications",
    icon: AlignLeft,
    role: ["manager"],
  },
  { name: "Agents", url: "Agents", icon: Building2, role: ["manager"] },
  { name: "Employees", url: "Employees", icon: Briefcase, role: ["manager"] },
  { name: "All users", url: "All Users", icon: Users, role: ["manager"] },
  {
    name: "Chat",
    url: "Chat",
    icon: MessageSquareMore,
    role: ["screener", "manager"],
  },
];

export const SidebarComponents: TSidebarItemsType[] = [
  { name: "Home", url: "Ordinary User Home", icon: Home },
  { name: "Messages", url: "Messages", icon: MessageSquareText },
  { name: "Apply Instructions", url: "ApplyInstructions", icon: ScrollText },
  { name: "Apply", url: "ApplyMain", icon: ShieldPlus },
];
