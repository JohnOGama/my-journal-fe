import { FileText, Flame, Sparkles } from "lucide-react";
import { Calendar, Separator } from "../ui";

const AnalyticCard = () => {
  return (
    <div className="border-border hidden w-full space-y-4 rounded-lg border p-3 lg:block lg:h-fit lg:w-[500px]">
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
    <div className="bg-primary/10 border-primary/15 rounded-md border p-2">
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          <Sparkles size={15} />
        </div>
        <p className="text-primary-foreground text-xs">{description}</p>
      </div>
    </div>
  );
}
