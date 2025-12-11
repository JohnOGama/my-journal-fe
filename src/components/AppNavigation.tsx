"use client";

import { APP_NAVIGATION_ITEMS } from "@/common/constants";
import { cn } from "@/libs/shadcn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="sticky grid grid-cols-4 border-t z-50 border-border bg-background w-full bottom-0 md:hidden">
      {APP_NAVIGATION_ITEMS.map((nav) => (
        <AppNavigationItem
          nav={nav}
          key={nav.label}
          isActive={pathname === nav.href}
        />
      ))}
    </div>
  );
};

export default AppNavigation;

const AppNavigationItem = ({
  nav,
  isActive,
}: {
  nav: (typeof APP_NAVIGATION_ITEMS)[0];
  isActive: boolean;
}) => {
  return (
    <Link
      href={nav.href}
      key={nav.label}
      className={cn(
        isActive && "text-primary",
        "flex flex-col gap-1 py-2 items-center justify-center "
      )}
    >
      <nav.icon className="w-6 h-6" />
      <span
        className={cn(
          isActive ? "text-primary" : "text-muted-foreground",
          "text-xs"
        )}
      >
        {nav.label}
      </span>
    </Link>
  );
};
