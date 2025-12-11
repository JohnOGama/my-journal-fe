import { Skeleton } from "../ui";

const JournalCardSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <AppJournalCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default JournalCardSkeleton;

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
