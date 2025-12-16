"use client";

import { useState } from "react";
import { cn } from "@/libs/shadcn";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "../icons/svg";
import { Search } from "lucide-react";
import AISearch from "./AISearch";
import FTSSearch from "./FTSSearch";
import { useQueryStore } from "@/store/useQueryStore";

type SearchType = "ai" | "fts";

const SearchJournal = ({
  containerClassName,
}: {
  containerClassName?: string;
}) => {
  const { setQuery } = useQueryStore();
  const [searchType, setSearchType] = useState<SearchType>("ai");

  return (
    <div
      className={cn(
        "border-border relative w-full rounded-xl border p-4",
        containerClassName,
      )}
    >
      {/* Tab Switcher */}
      <div className="mb-4 flex gap-2">
        <Button
          variant={searchType === "ai" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setSearchType("ai");
            setQuery({ search: "", type: "fts" });
          }}
          className={cn(
            "flex items-center gap-1.5",
            searchType === "ai" &&
              "bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500",
          )}
        >
          <SparkleIcon className="h-3.5 w-3.5" />
          <span>AI Search</span>
        </Button>
        <Button
          variant={searchType === "fts" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setSearchType("fts");
            setQuery({ search: "", type: "fts" });
          }}
        >
          <Search className="h-3.5 w-3.5" />
          <span>Semantic Search</span>
        </Button>
      </div>

      {/* Search Component */}
      {searchType === "ai" ? <AISearch /> : <FTSSearch />}
    </div>
  );
};

export default SearchJournal;
