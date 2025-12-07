"use client";
import { Journal } from "@/features/journal/api";
import { useGetUserJournals } from "@/features/journal/queries";
import { dateFormatted } from "@/helper/dateFormat";
import { Calendar } from "lucide-react";

export const AppJournalCardList = () => {
  const { data } = useGetUserJournals();

  return (
    <div className="space-y-4">
      {data?.data?.items?.map((journal) => (
        <AppJournalCard key={journal.uid} journal={journal} />
      ))}
    </div>
  );
};

export const AppJournalCard = ({ journal }: { journal: Journal }) => {
  return (
    <div className="w-full space-y-2 rounded-lg border border-input p-3">
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
  );
};
