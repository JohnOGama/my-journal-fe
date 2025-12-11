"use client";
import { Journal } from "@/features/journal/api";
import { useGetUserJournals } from "@/features/journal/queries";
import { dateFormatted } from "@/helper/dateFormat";
import { Calendar } from "lucide-react";
import { useState } from "react";
import ViewJournalDrawer from "./drawer/ViewJournalDrawer/ViewJournalDrawer";
import { highlightText } from "@/helper/highlightText";
import { useQueryState } from "nuqs";
import JournalCardSkeleton from "./skeleton/JournalCardSkeleton";

export const AppJournalCardList = () => {
  const [query] = useQueryState("q", { defaultValue: "" });
  const { data, isLoading } = useGetUserJournals({ search: query });

  if (isLoading) {
    return <JournalCardSkeleton />;
  }

  if (!data?.data) {
    return (
      <div className="h-full text-center flex justify-center items-center text-muted-foreground">
        No journals found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.data?.items?.map((journal) => (
        <AppJournalCard key={journal.uid} journal={journal} />
      ))}
    </div>
  );
};

export const AppJournalCard = ({ journal }: { journal: Journal }) => {
  const [query] = useQueryState("q", { defaultValue: "" });
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null
  );

  return (
    <>
      <div
        className="w-full cursor-pointer hover:bg-input/30  hover:border-primary duration-300 space-y-2 rounded-lg border border-input p-3"
        onClick={() => setSelectedJournalId(journal.uid)}
      >
        <h1
          dangerouslySetInnerHTML={{
            __html: highlightText(journal.title, query),
          }}
          className="text-sm font-semibold line-clamp-1"
        />
        <p
          dangerouslySetInnerHTML={{
            __html: highlightText(journal.content, query),
          }}
          className="text-sm text-muted-foreground line-clamp-3"
        />
        <div className="flex justify-between items-center text-muted-foreground text-xs">
          <div className="flex gap-2 items-center ">
            <Calendar size={16} />
            <p>{dateFormatted(journal.createdAt)}</p>
          </div>
          <div>
            <h1>Mood: {journal.mood}</h1>
          </div>
        </div>
      </div>

      <ViewJournalDrawer
        open={selectedJournalId === journal.uid}
        selectedJournalId={selectedJournalId}
        onClose={() => setSelectedJournalId(null)}
      />
    </>
  );
};
