"use client";

import { signOut } from "@/helper/authHelpers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/features/route";
import { useGetUserData } from "@/features/user/queries";
import CreateJournalDrawer from "../drawer/CreateJournalDrawer";
import { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetUserData();

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="w-full space-y-3 lg:w-[600px]">
      <div className="border-border w-full space-y-4 rounded-lg border p-3 lg:h-fit">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">
              {isLoading ? "Loading..." : `Hi ${data?.name}`}
            </h1>
            <p className="text-sm">Welcome back to your journal</p>
          </div>
          <Button loading={loading} variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <CreateJournalDrawer />
      </div>
      <div className="hidden lg:block lg:space-y-1">
        <p className="text-muted-foreground/60 w-fit cursor-pointer text-xs hover:underline">
          Release Notes
        </p>
        <p className="text-muted-foreground/60 w-fit cursor-pointer text-xs hover:underline">
          Contact Developer
        </p>
      </div>
    </div>
  );
};

export default Header;
