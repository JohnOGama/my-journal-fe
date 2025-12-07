"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetJournal } from "@/features/journal/queries";
import {
  useDeleteJournal,
  useUpdateJournal,
} from "@/features/journal/mutations";
import AppDrawer from "../AppDrawer";
import {
  Button,
  Input,
  Textarea,
  Label,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui";
import { Calendar, Pencil, Sparkles, Trash } from "lucide-react";
import { dateFormatted } from "@/helper/dateFormat";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const editJournalSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  mood: z.string().min(1, { message: "Mood is required" }),
});

type EditJournalSchemaT = z.infer<typeof editJournalSchema>;

const ViewJournalDrawer = ({
  selectedJournalId,
  journalUid,
  setSelectedJournalId,
}: {
  selectedJournalId: string | null;
  journalUid: string;
  setSelectedJournalId: (journalId: string | null) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useGetJournal(selectedJournalId!);
  const { updateJournalAsync, isUpdating } = useUpdateJournal();

  const journal = data?.data;

  const form = useForm<EditJournalSchemaT>({
    mode: "onChange",
    resolver: zodResolver(editJournalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  // Reset form values when journal data loads or changes
  useEffect(() => {
    if (journal) {
      reset({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
      });
    }
  }, [journal, reset]);

  const onSubmit = async (data: EditJournalSchemaT) => {
    if (!selectedJournalId) return;
    await updateJournalAsync({ uid: selectedJournalId, body: data });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (journal) {
      reset({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedJournalId(null);
      setIsEditing(false);
    }
  };

  return (
    <AppDrawer
      title={isEditing ? "Edit Journal" : "View Journal"}
      open={selectedJournalId === journalUid}
      onOpenChange={handleOpenChange}
      showFooter={false}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title Field */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70"
            >
              Title
            </Label>
            <Input
              id="title"
              {...register("title")}
              error={errors.title?.message}
              placeholder="Give your entry a title..."
              className="font-medium placeholder:font-normal"
            />
          </div>

          {/* Mood Field */}
          <div className="space-y-2">
            <Label
              htmlFor="mood"
              className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70"
            >
              Mood
            </Label>
            <Input
              id="mood"
              {...register("mood")}
              error={errors.mood?.message}
              placeholder="How are you feeling?"
              className="placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70"
            >
              Journal Entry
            </Label>
            <Textarea
              id="content"
              {...register("content")}
              error={errors.content?.message}
              placeholder="Write your thoughts..."
              className="h-[180px] leading-relaxed placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              loading={isSubmitting || isUpdating}
              disabled={!isValid || !isDirty}
              type="submit"
              className="flex-1"
            >
              {isSubmitting || isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Header: Mood Badge & Edit Button */}
          <div className="flex items-center justify-between">
            {journal?.mood && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Sparkles size={12} />
                {journal.mood}
              </span>
            )}
            <DeleteJournalDialog journalUid={journalUid} />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight leading-tight text-foreground">
              {journal?.title}
            </h1>
            {/* Date */}
            <div className="flex items-center gap-1.5 text-muted-foreground">
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
          <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />

          {/* Content */}
          <article>
            <p className="text-[15px] leading-relaxed text-foreground/80 whitespace-pre-wrap">
              {journal?.content}
            </p>
          </article>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="default"
              onClick={() => setIsEditing(true)}
              className="flex-1"
            >
              <Pencil size={14} />
              Edit
            </Button>
          </div>
        </div>
      )}
    </AppDrawer>
  );
};

export default ViewJournalDrawer;

function DeleteJournalDialog({ journalUid }: { journalUid: string }) {
  const { deleteJournalAsync, isDeleting } = useDeleteJournal();

  const handleDelete = async () => {
    await deleteJournalAsync(journalUid);
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
