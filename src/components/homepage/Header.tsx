"use client";

import { authClient } from "@/libs/authClient";
import { signOut } from "@/helper/authHelpers";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user) {
        setUserName(session.data.user.name || "User");
      }
    } catch {
      // Ignore errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">
          {isLoading ? "Loading..." : `Hi ${userName}`}
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
