import { AppJournalCardList } from "@/components/AppJournalCard";
import CreateJournalDrawer from "@/components/drawer/CreateJournalDrawer";
import Header from "@/components/homepage/Header";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-4">
      <Header />
      <CreateJournalDrawer />
      <Suspense fallback={<div>Loading...</div>}>
        <AppJournalCardList />
      </Suspense>
    </div>
  );
}
