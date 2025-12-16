"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/libs/shadcn";
import { SparkleIcon } from "../icons/svg";
import { useQueryStore } from "@/store/useQueryStore";
import { useGetUserData } from "@/features/user/queries";
import { REQUIRED_JOURNALS } from "@/common/constants";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";

const PLACEHOLDER_TEXTS = [
  "What happened today?",
  "Best journal entry I've written",
  "A favorite memory",
  "Goals for this week",
  "Moments I'm grateful for",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 2000;

const AISearch = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { setQuery } = useQueryStore();

  const { data } = useGetUserData();
  const totalJournals = data?.data?.journalEntries?.totalJournals || 0;

  const handleSearch = useCallback(() => {
    if (totalJournals !== REQUIRED_JOURNALS) {
      toast.error("You need to write 20 journals to use the AI search");
      return;
    }
    setQuery({ search: searchValue, type: "ai" });
    setIsFocused(false);
    setSearchValue("");
  }, [setQuery, searchValue, totalJournals]);

  const handleUnlockAI = useCallback(() => {
    const progressElement = document.getElementById("ai-progress");
    if (progressElement) {
      progressElement.classList.add("border-primary");
      setTimeout(() => {
        progressElement.classList.remove("border-primary");
      }, 2000);
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      const currentText = PLACEHOLDER_TEXTS[textIndexRef.current];

      if (!isDeletingRef.current) {
        if (charIndexRef.current < currentText.length) {
          charIndexRef.current += 1;
          setPlaceholder(currentText.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(animate, TYPING_SPEED);
        } else {
          timeoutRef.current = setTimeout(() => {
            isDeletingRef.current = true;
            animate();
          }, PAUSE_DURATION);
        }
      } else {
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setPlaceholder(currentText.slice(0, charIndexRef.current));
          timeoutRef.current = setTimeout(animate, DELETING_SPEED);
        } else {
          isDeletingRef.current = false;
          textIndexRef.current =
            (textIndexRef.current + 1) % PLACEHOLDER_TEXTS.length;
          timeoutRef.current = setTimeout(animate, TYPING_SPEED);
        }
      }
    };

    animate();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* AI Badge */}
      <div className="mb-2 flex items-center gap-1.5">
        <SparkleIcon className="h-3.5 w-3.5 animate-pulse" />
        <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-xs font-medium text-transparent">
          AI-Powered Search
        </span>
      </div>

      {/* Search Container */}
      <div className="group relative rounded-xl">
        {/* Animated Gradient Border */}
        <div
          className={cn(
            "absolute -inset-px rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500 opacity-60 blur-sm transition-all duration-300",
          )}
        />
        <div
          className={cn(
            "absolute -inset-px rounded-xl bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500 opacity-60 transition-all duration-300",
          )}
        />

        {/* Input Container */}
        <div className="bg-background dark:bg-background/80 relative flex items-center gap-3 rounded-xl border border-transparent px-4 py-3 backdrop-blur-sm">
          {/* Sparkle Icon */}
          <div className="relative shrink-0">
            <SparkleIcon
              className={cn(
                "h-5 w-5 transition-all duration-300",
                isFocused ? "scale-110" : "scale-100",
              )}
            />
            {/* Sparkle Glow */}
            <div
              className={cn(
                "absolute inset-0 h-5 w-5 rounded-full bg-violet-400/50 blur-md transition-opacity duration-300",
                isFocused ? "opacity-100" : "opacity-0",
              )}
            />
          </div>

          {/* Input */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder={placeholder || ""}
            className={cn(
              "text-foreground placeholder:text-muted-foreground/70 flex-1 bg-transparent text-sm outline-none",
              "transition-all duration-200",
              totalJournals !== REQUIRED_JOURNALS &&
                "pointer-events-none cursor-not-allowed",
            )}
          />

          {/* Search Hint */}
          <div
            onClick={handleSearch}
            className={cn(
              "flex cursor-pointer items-center gap-1 transition-all duration-300",
              isFocused || searchValue
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0",
            )}
          >
            <kbd className="border-border bg-muted text-muted-foreground hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium sm:inline-flex">
              <span className="text-xs">⏎</span>
            </kbd>
          </div>

          {/* Clear Button */}
          {searchValue && (
            <button
              onClick={() => {
                setSearchValue("");
                setQuery({ search: "", type: "ai" });
              }}
              className="bg-muted hover:bg-muted-foreground/20 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
            >
              <svg
                className="text-muted-foreground h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-muted-foreground/60 pl-1 text-xs">
          {totalJournals !== REQUIRED_JOURNALS
            ? `Write ${REQUIRED_JOURNALS} journals to unlock AI-powered search`
            : "Ask anything about your journal entries using natural language (5 searches per day)"}
        </p>
        {totalJournals !== REQUIRED_JOURNALS && (
          <div
            onClick={handleUnlockAI}
            className="text-muted-foreground/60 hidden cursor-pointer items-center gap-1.5 lg:flex"
          >
            <LockKeyhole className="size-3" />
            <span className="text-xs font-medium">Unlock AI Search</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISearch;
