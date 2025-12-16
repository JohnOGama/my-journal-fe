"use client";

import { useState, useCallback } from "react";
import { cn } from "@/libs/shadcn";
import { Search } from "lucide-react";
import { useQueryStore } from "@/store/useQueryStore";

const FTSSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { setQuery } = useQueryStore();

  const handleSearch = useCallback(() => {
    setQuery({ search: searchValue, type: "fts" });
    setIsFocused(false);
    setSearchValue("");
  }, [setQuery, searchValue]);

  return (
    <div className="w-full">
      {/* FTS Badge */}
      <div className="mb-2 flex items-center gap-1.5">
        <span className="text-muted-foreground text-xs font-medium">
          Full Text Search
        </span>
      </div>

      {/* Search Container */}
      <div className="group relative rounded-xl">
        {/* Border */}
        <div
          className={cn(
            "border-border absolute -inset-px rounded-xl border opacity-60 transition-all duration-300",
            isFocused && "border-primary/50 opacity-100",
          )}
        />

        {/* Input Container */}
        <div className="bg-background dark:bg-background/80 border-border relative flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-sm transition-all duration-300">
          {/* Search Icon */}
          <div className="relative shrink-0">
            <Search
              className={cn(
                "text-muted-foreground h-5 w-5 transition-all duration-300",
                isFocused ? "text-primary scale-110" : "scale-100",
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
            placeholder="Search for keywords in your journals..."
            className={cn(
              "text-foreground placeholder:text-muted-foreground/70 flex-1 bg-transparent text-sm outline-none",
              "transition-all duration-200",
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
                setQuery({ search: "", type: "fts" });
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
      <div className="mt-2">
        <p className="text-muted-foreground/60 pl-1 text-xs">
          Search for specific keywords or phrases in your journal entries
        </p>
      </div>
    </div>
  );
};

export default FTSSearch;
