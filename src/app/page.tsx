import { AppJournalCardList } from "@/components/AppJournalCard";
import Header from "@/components/homepage/Header";
import AnalyticCard from "@/components/homepage/AnalyticCard";
import SearchJournal from "@/components/homepage/SearchJournal";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 space-y-4 lg:flex-row lg:gap-4">
      <Header />

      <div className="flex w-full flex-col gap-5">
        <SearchJournal containerClassName="hidden lg:block" />
        <AppJournalCardList />
      </div>
      <AnalyticCard className="hidden lg:block" />
    </div>
  );
}
