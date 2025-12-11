import { Suspense } from "react";
import { AppJournalCardList } from "@/components/AppJournalCard";
import SearchInput from "./_components/SearchInput";

const SearchPage = () => {
  return (
    <div className="space-y-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchInput />
        <AppJournalCardList />
      </Suspense>
    </div>
  );
};

export default SearchPage;
