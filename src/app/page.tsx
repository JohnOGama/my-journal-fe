import { AppJournalCardList } from "@/components/AppJournalCard";
import CreateJournalDrawer from "@/components/drawer/CreateJournalDrawer";
import Header from "@/components/homepage/Header";

export default function Home() {
  return (
    <div className="space-y-4">
      <Header />
      <CreateJournalDrawer />
      <AppJournalCardList />
    </div>
  );
}
