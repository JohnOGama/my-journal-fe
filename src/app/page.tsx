import { AppJournalCardList } from "@/components/AppJournalCard";
import Header from "@/components/homepage/Header";
import JournalCardSkeleton from "@/components/skeleton/JournalCardSkeleton";
import { Suspense } from "react";
import AnalyticCard from "@/components/homepage/AnalyticCard";

export default function Home() {
  return (
    <div className="space-y-4 flex flex-col lg:flex-row lg:gap-4 gap-2">
      <Header />
      <Suspense fallback={<JournalCardSkeleton />}>
        <AppJournalCardList />
      </Suspense>
      <AnalyticCard />
    </div>
  );
}
