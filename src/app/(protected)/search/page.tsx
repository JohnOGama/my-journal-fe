import { Suspense } from "react";
import { AppJournalCardList } from "@/components/AppJournalCard";
import SearchInput from "./_components/SearchInput";
import JournalCardSkeleton from "@/components/skeleton/JournalCardSkeleton";

const SearchPage = () => {
  return (
    <div className="space-y-4">
      <Suspense fallback={<JournalCardSkeleton />}>
        <SearchInput />
        <AppJournalCardList />
      </Suspense>
    </div>
  );
};

export default SearchPage;
