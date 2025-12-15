import { Suspense } from "react";
import { AppJournalCardList } from "@/components/AppJournalCard";
import JournalCardSkeleton from "@/components/skeleton/JournalCardSkeleton";
import SearchJournal from "@/components/homepage/SearchJournal";

const SearchPage = () => {
  return (
    <div className="space-y-4">
      <Suspense fallback={<JournalCardSkeleton />}>
        <SearchJournal />
        <AppJournalCardList />
      </Suspense>
    </div>
  );
};

export default SearchPage;
