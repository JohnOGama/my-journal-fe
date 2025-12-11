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

export const MOOD_OPTIONS = [
  { label: "😊 Happy", value: "happy" },
  { label: "🤩 Excited", value: "excited" },
  { label: "😌 Content", value: "content" },
  { label: "🥹 Proud", value: "proud" },
  { label: "🥰 Loving", value: "loving" },
  { label: "🌟 Hopeful", value: "hopeful" },
  { label: "😢 Sad", value: "sad" },
  { label: "😠 Angry", value: "angry" },
  { label: "😰 Anxious", value: "anxious" },
  { label: "😔 Guilty", value: "guilty" },
  { label: "😨 Fearful", value: "fearful" },
  { label: "😒 Jealous", value: "jealous" },
  { label: "😕 Confused", value: "confused" },
  { label: "😲 Surprised", value: "surprised" },
  { label: "😑 Bored", value: "bored" },
];
