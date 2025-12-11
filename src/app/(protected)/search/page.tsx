"use client";

import { AppJournalCardList } from "@/components/AppJournalCard";
import SearchInput from "./_components/SearchInput";

const SearchPage = () => {
  return (
    <div className="space-y-4">
      <SearchInput />
      <AppJournalCardList />
    </div>
  );
};

export default SearchPage;
