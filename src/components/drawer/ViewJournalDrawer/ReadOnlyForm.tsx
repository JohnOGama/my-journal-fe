import RenderedRichText from "@/components/rich-text-editor/RenderedRichText";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialog,
  Button,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { getJournal } from "@/features/journal/api";
import { useDeleteJournal } from "@/features/journal/mutations";
import { dateFormatted } from "@/helper/dateFormat";
import { Calendar, Pencil, Sparkles, Trash } from "lucide-react";

const ReadOnlyForm = ({
  journal,
  setIsEditing,
}: {
  journal?: getJournal | undefined;
  setIsEditing: (isEditing: boolean) => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Header: Mood Badge & Edit Button */}
      <div className="flex items-center justify-between">
        {journal?.mood && (
          <span className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
            <Sparkles size={12} />
            {journal.mood}
          </span>
        )}
        <div>
          <Button
            variant="ghost"
            size="default"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={14} />
            Edit
          </Button>
          <DeleteJournalDialog journalId={journal?.uid ?? ""} />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-foreground text-2xl leading-tight font-bold tracking-tight">
          {journal?.title}
        </h1>
        {/* Date */}
        <div className="text-muted-foreground flex items-center gap-1.5">
          <Calendar size={14} className="opacity-70" />
          {journal?.updatedAt ? (
            <time className="text-sm">
              {dateFormatted(journal.updatedAt)} (Updated)
            </time>
          ) : (
            <time className="text-sm">
              {journal?.createdAt ? dateFormatted(journal.createdAt) : ""}
            </time>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="from-border via-border/50 h-px bg-linear-to-r to-transparent" />

      {/* Content */}
      <RenderedRichText
        className="max-h-[400px] overflow-y-auto"
        savedJson={JSON.stringify(journal?.content)}
      />
    </div>
  );
};

export default ReadOnlyForm;
function DeleteJournalDialog({ journalId }: { journalId: string }) {
  const { deleteJournalAsync, isDeleting } = useDeleteJournal();

  const handleDelete = async () => {
    await deleteJournalAsync(journalId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash size={14} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent container={document.body}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Journal</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this journal? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={handleDelete}>
            {isDeleting ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
