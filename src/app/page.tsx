import AppDrawer from "@/components/AppDrawer";
import { AppJournalCardList } from "@/components/AppJournalCard";
import AppProcessingPage from "@/components/AppProcessingPage";
import { Button, Input } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Hi John Doe</h1>
        <p className="text-sm">Welcome back to your journal</p>
      </div>
      <AppDrawer
        trigger={
          <Button
            className="w-full bg-indigo-50 text-indigo-600"
            variant="default"
            size="icon"
          >
            New
          </Button>
        }
        title="Create Journal"
        description="Create a new journal entry"
        showFooter={false}
        onSubmit={() => {
          console.log("Create Journal");
        }}
      >
        <div className="space-y-4">
          <Input placeholder="Journal Title" />
          <Textarea placeholder="Journal Description" />
          <Button className="w-full">Create Journal</Button>
        </div>
      </AppDrawer>

      <Suspense
        fallback={
          <AppProcessingPage
            title="Loading journals"
            description="We are loading your journals. Please wait..."
          />
        }
      >
        <AppJournalCardList />
      </Suspense>
    </div>
  );
}
