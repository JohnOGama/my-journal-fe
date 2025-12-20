"use client";
import { FileText, Flame } from "lucide-react";
import { Calendar, Separator, Skeleton } from "../ui";
import { SparkleIcon } from "../icons/svg";
import { cn } from "@/libs/shadcn";
import { useGetUserAnalytics } from "@/features/analytics/queries";
import { getYearMonth } from "@/helper/getYearMonth";
import { useState } from "react";
import type { CalendarDay, Modifiers } from "react-day-picker";
import { useGeneratedAiWeekSummaryQuery } from "@/features/ai/queries";
import { convertToJsonParse } from "@/helper/conertToJsonParse";

const AnalyticCard = ({ className }: { className?: string }) => {
  const [currentMonth, setCurrentMonth] = useState<string>(
    getYearMonth(new Date()),
  );
  const { data, isLoading: isLoadingUserAnalytics } = useGetUserAnalytics({
    month: currentMonth,
  });
  const totalJournals = data?.data?.totalJournals;
  const averageWords = data?.data?.averageWords;
  const entriesDates = data?.data?.entriesDates;

  const {
    data: generatedAiWeekSummary,
    isLoading: isLoadingGeneratedAiWeekSummary,
  } = useGeneratedAiWeekSummaryQuery();
  const summaryContent =
    convertToJsonParse(generatedAiWeekSummary?.data?.content).overall || "";

  const handleMonthChange = (date: Date) => {
    const yearMonth = getYearMonth(date);
    setCurrentMonth(yearMonth);
  };

  const CustomDay = (
    props: {
      day: CalendarDay;
      modifiers: Modifiers;
      className?: string;
    } & React.HTMLAttributes<HTMLDivElement>,
  ) => {
    const hasEntry = props.modifiers?.hasEntry ?? false;
    return (
      <td className={cn("relative", props.className)}>
        <span>{props.day.date.getDate()}</span>
        {hasEntry && (
          <div className="absolute bottom-1 flex w-full items-center justify-center">
            <div className="bg-primary h-1 w-[50%] rounded-md" />
          </div>
        )}
      </td>
    );
  };

  return (
    <div
      className={cn(
        "border-border w-full space-y-4 rounded-lg border p-3 lg:block lg:h-fit lg:w-[650px]",
        className,
      )}
    >
      <h1 className="text-lg font-semibold">Analytics</h1>
      <Separator />

      {isLoadingGeneratedAiWeekSummary ? (
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10" />
          <div className="relative space-y-2 p-3">
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </div>
      ) : (
        summaryContent !== "No entries" && (
          <GeneratedAiSummaryWeek description={summaryContent} />
        )
      )}

      <div className="w-full">
        <h1>Total Journals</h1>
        {isLoadingUserAnalytics ? (
          <div className="flex items-center gap-1">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-12" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Flame fill="currentColor" className="text-orange-400" />
            <p className="text-2xl font-bold">{totalJournals}</p>
          </div>
        )}
      </div>

      <div className="w-full">
        <h1>Average Words</h1>
        {isLoadingUserAnalytics ? (
          <div className="flex items-center gap-1">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-12" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <FileText className="text-orange-400" />
            <p className="text-2xl font-bold">{averageWords}</p>
          </div>
        )}
      </div>

      <div className="border-border rounded-md border">
        {isLoadingUserAnalytics ? (
          <div className="space-y-3 p-4">
            <Skeleton className="mx-auto h-8 w-32" />
            <div className="grid grid-cols-7 gap-2">
              {[...Array(35)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <Calendar
            className="w-full"
            onMonthChange={handleMonthChange}
            components={{
              Day: CustomDay,
            }}
            modifiers={{
              hasEntry: (date: Date) => {
                if (!entriesDates) return false;
                const dateString = date.toDateString();
                return entriesDates.some((entryDate) => {
                  const entryDateObj =
                    entryDate instanceof Date ? entryDate : new Date(entryDate);
                  return entryDateObj.toDateString() === dateString;
                });
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AnalyticCard;

function GeneratedAiSummaryWeek({ description }: { description: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10" />
      <div className="absolute -inset-px rounded-xl bg-linear-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20" />

      <div className="relative space-y-2 p-3">
        {/* AI Badge */}
        <div className="flex items-center gap-1.5">
          <SparkleIcon className="h-3.5 w-3.5 animate-pulse" />
          <span className="bg-linear-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-[10px] font-semibold tracking-wider text-transparent uppercase">
            AI Weekly Summary
          </span>
        </div>

        {/* Summary Text */}
        <p className="text-foreground/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
