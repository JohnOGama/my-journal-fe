"use client";

import { Input } from "@/components/ui";
import { asyncDebounce } from "@tanstack/react-pacer";
import { useQueryState } from "nuqs";

const SearchInput = () => {
  const [, setQuery] = useQueryState("q", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const searchJournalAPI = asyncDebounce(
    async (query: string) => {
      setQuery(query);
    },
    { wait: 400 }
  );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold">Search</h1>
      <Input
        onChange={(e) => searchJournalAPI(e.target.value)}
        placeholder="Search for a journal"
      />
    </div>
  );
};

export default SearchInput;
