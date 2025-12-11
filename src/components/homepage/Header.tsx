"use client";

import { signOut } from "@/helper/authHelpers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/features/route";
import { useGetUserData } from "@/features/user/queries";

const Header = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUserData();

  const handleSignOut = async () => {
    await signOut();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">
          {isLoading ? "Loading..." : `Hi ${data?.name}`}
        </h1>
        <p className="text-sm">Welcome back to your journal</p>
      </div>
      <Button variant="ghost" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default Header;
