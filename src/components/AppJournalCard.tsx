"use client";
import { Journal } from "@/features/journal/api";
import { useGetUserJournals } from "@/features/journal/queries";
import { dateFormatted } from "@/helper/dateFormat";
import { Calendar, AlertCircle, Zap, Clock, BookOpen } from "lucide-react";
import { useState } from "react";
import ViewJournalDrawer from "./drawer/ViewJournalDrawer/ViewJournalDrawer";
import { highlightText } from "@/helper/highlightText";
import JournalCardSkeleton from "./skeleton/JournalCardSkeleton";
import { useQueryStore } from "@/store/useQueryStore";
import RenderedRichText from "./rich-text-editor/RenderedRichText";

export const AppJournalCardList = () => {
  const { query, setQuery } = useQueryStore();
  const { data, isLoading, error } = useGetUserJournals({
    search: query.search,
    type: query.type,
  });

  if (isLoading) {
    return <JournalCardSkeleton />;
  }

  if (error) {
    // Type guard for error with statusCode
    interface ErrorWithStatusCode extends Error {
      statusCode?: number;
      response?: { status?: number };
    }

    const errorWithStatus = error as ErrorWithStatusCode;
    const statusCode =
      errorWithStatus?.statusCode || errorWithStatus?.response?.status;
    const isUsageLimitError = statusCode === 403;
    const errorMessage = errorWithStatus?.message || "An error occurred";

    return (
      <div className="flex h-full min-h-[400px] items-center justify-center p-6">
        <div className="bg-background flex w-full max-w-md flex-col items-center gap-4 rounded-lg p-6 text-center shadow-lg">
          <div
            className={`flex size-16 items-center justify-center rounded-full ${
              isUsageLimitError
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "bg-destructive/10 text-destructive dark:bg-destructive/20"
            }`}
          >
            {isUsageLimitError ? (
              <Zap className="size-8" strokeWidth={2} />
            ) : (
              <AlertCircle className="size-8" strokeWidth={2} />
            )}
          </div>

          <div className="space-y-2">
            <h3
              className={`text-lg font-semibold ${
                isUsageLimitError
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-destructive"
              }`}
            >
              {isUsageLimitError
                ? "Search Limit Reached"
                : "Something went wrong"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {errorMessage}
            </p>
          </div>

          {isUsageLimitError && (
            <div
              onClick={() => setQuery({ search: "", type: "ai" })}
              className="bg-muted/50 flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm"
            >
              <Clock className="text-muted-foreground size-4" />
              <span className="text-muted-foreground">
                Please try again later
              </span>
            </div>
          )}

          <div className="bg-muted/30 mt-2 h-px w-full" />
        </div>
      </div>
    );
  }

  if (!data?.data) {
    const hasSearchQuery = query.search && query.search.trim().length > 0;

    return (
      <div className="flex h-full min-h-[400px] items-center justify-center p-6">
        <div className="bg-background flex w-full max-w-md flex-col items-center gap-4 rounded-lg p-6 text-center shadow-lg">
          <div className="bg-muted/50 text-muted-foreground dark:bg-muted/30 flex size-16 items-center justify-center rounded-full">
            <BookOpen className="size-8" strokeWidth={2} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {hasSearchQuery ? "No journals found" : "No journals yet"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {hasSearchQuery
                ? `We couldn't find any journals matching "${query}". Try adjusting your search terms.`
                : "Start your journaling journey by creating your first entry. Your thoughts and memories are waiting to be captured."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {data?.data?.items?.map((journal) => (
        <AppJournalCard key={journal.uid} journal={journal} />
      ))}
    </div>
  );
};

export const AppJournalCard = ({ journal }: { journal: Journal }) => {
  const { query } = useQueryStore();
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null,
  );

  return (
    <>
      <div
        className="hover:bg-input/30 hover:border-primary border-input w-full cursor-pointer space-y-2 rounded-lg border p-3 duration-300"
        onClick={() => setSelectedJournalId(journal.uid)}
      >
        <h1
          dangerouslySetInnerHTML={{
            __html: highlightText(journal.title, query.search),
          }}
          className="line-clamp-1 text-sm font-semibold"
        />

        <RenderedRichText
          savedJson={JSON.stringify(journal.content)}
          className="line-clamp-3"
        />
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
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
