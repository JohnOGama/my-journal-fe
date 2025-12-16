"use client";

import { signOut } from "@/helper/authHelpers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/features/route";
import { useGetUserData } from "@/features/user/queries";
import CreateJournalDrawer from "../drawer/CreateJournalDrawer";
import { useState } from "react";
import { Progress } from "../ui";
import { REQUIRED_JOURNALS } from "@/common/constants";
import { Folder, Plus } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetUserData();
  const userName = data?.data?.user?.name;
  const totalJournals = data?.data?.journalEntries?.totalJournals || 0;
  const progress = totalJournals
    ? (totalJournals / REQUIRED_JOURNALS) * 100
    : 0;

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
              {isLoading ? "Loading..." : `Hi ${userName}`}
            </h1>
            <p className="text-sm">Welcome back to your journal</p>
          </div>
          <Button loading={loading} variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <CreateJournalDrawer />
      </div>

      <div
        id="ai-progress"
        className="border-border w-full space-y-4 rounded-lg border p-4 duration-300 lg:h-fit"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-semibold">Your Progress</h2>
            <p className="text-muted-foreground/70 text-xs">
              {isLoading ? (
                "Loading progress..."
              ) : (
                <>
                  {totalJournals} of {REQUIRED_JOURNALS} journals completed
                </>
              )}
            </p>
          </div>
          <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1">
            <span className="text-xs font-medium tabular-nums">
              {isLoading ? "—" : `${Math.round(progress)}%`}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <Progress
            value={isLoading ? 0 : progress}
            className="h-2.5"
            aria-label={`Progress: ${Math.round(progress)}% towards ${REQUIRED_JOURNALS} journals`}
          />
          <div className="flex items-start gap-2">
            <p className="text-muted-foreground/90 text-xs leading-relaxed">
              {isLoading ? (
                "Loading..."
              ) : totalJournals >= REQUIRED_JOURNALS ? (
                <span className="text-foreground font-medium">
                  Congratulations! You can now unlock the AI feature.
                </span>
              ) : (
                <>
                  <span className="text-foreground font-medium">
                    {REQUIRED_JOURNALS - totalJournals} more journal
                    {REQUIRED_JOURNALS - totalJournals !== 1 ? "s" : ""}
                  </span>{" "}
                  to unlock the AI feature.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="border-border w-full space-y-4 rounded-lg border p-4 duration-300 lg:h-fit">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">My Workspace</h2>
          <Button variant="ghost" size="sm" className="h-7">
            <Plus className="size-3.5" />
            <span className="text-xs">Add Workspace</span>
          </Button>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm">
            <Folder className="text-muted-foreground size-4" />
            <span className="text-muted-foreground/90 cursor-pointer hover:underline">
              journals
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Folder className="text-muted-foreground size-4" />
            <span className="text-muted-foreground/90 cursor-pointer hover:underline">
              todo-list
            </span>
          </div>
        </div>
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
