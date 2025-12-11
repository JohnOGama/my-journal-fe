"use client";
import { Journal } from "@/features/journal/api";
import { useGetUserJournals } from "@/features/journal/queries";
import { dateFormatted } from "@/helper/dateFormat";
import { Calendar } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import ViewJournalDrawer from "./drawer/ViewJournalDrawer/ViewJournalDrawer";

export const AppJournalCardList = () => {
  const { data, isLoading } = useGetUserJournals();
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <AppJournalCardSkeleton key={i} />
        ))}
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
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null
  );

  return (
    <>
      <div
        className="w-full cursor-pointer hover:bg-input/30  hover:border-primary duration-300 space-y-2 rounded-lg border border-input p-3"
        onClick={() => setSelectedJournalId(journal.uid)}
      >
        <h1 className="text-sm font-semibold line-clamp-1">{journal.title}</h1>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {journal.content}
        </p>
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

const AppJournalCardSkeleton = () => {
  return (
    <div className="w-full space-y-2 rounded-lg border border-input p-3">
      <Skeleton className="h-4 w-3/4" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};
