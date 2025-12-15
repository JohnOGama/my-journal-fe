import { FileText, Flame } from "lucide-react";
import { Calendar, Separator } from "../ui";
import { SparkleIcon } from "../icons/svg";
import { cn } from "@/libs/shadcn";

const AnalyticCard = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border-border w-full space-y-4 rounded-lg border p-3 lg:block lg:h-fit lg:w-[600px]",
        className,
      )}
    >
      <h1 className="text-lg font-semibold">Analytics</h1>
      <Separator />
      <GeneratedAiSummaryWeek description="This week was filled with happiness and a strong sense of progress." />

      <div className="w-full">
        <h1>Streak</h1>
        <div className="flex items-center">
          <Flame fill="currentColor" className="text-orange-400" />
          <p className="text-2xl font-bold">20</p>
        </div>
      </div>
      <div className="w-full">
        <h1>Words per entry</h1>
        <div className="flex items-center">
          <FileText className="text-orange-400" />
          <p className="text-2xl font-bold">20</p>
        </div>
      </div>

      <div className="border-border rounded-md border">
        <Calendar className="w-full" />
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
