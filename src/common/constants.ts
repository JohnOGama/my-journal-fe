import { BarChart, CircleUser, HomeIcon, Search } from "lucide-react";

// Use relative URL to go through Next.js proxy (same-origin for cookies)
export const baseURL = "/api/v1";

export const APP_NAVIGATION_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Search",
    href: "/search",
    icon: Search,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: CircleUser,
  },
];
