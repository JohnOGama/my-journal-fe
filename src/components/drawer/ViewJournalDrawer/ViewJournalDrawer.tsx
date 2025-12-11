"use client";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetJournal } from "@/features/journal/queries";
import { useUpdateJournal } from "@/features/journal/mutations";
import AppDrawer from "../../AppDrawer";
import { Skeleton } from "../../ui/skeleton";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EditForm from "./EditForm";
import ReadOnlyForm from "./ReadOnlyForm";

const editJournalSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  mood: z.string().min(1, { message: "Mood is required" }),
});

export type EditJournalSchemaT = z.infer<typeof editJournalSchema>;

const ViewJournalDrawer = ({
  open,
  selectedJournalId,
  onClose,
}: {
  open: boolean;
  selectedJournalId: string | null;
  onClose: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useGetJournal(selectedJournalId!);
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
    reset,
    formState: { isSubmitting },
  } = form;

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
      onClose();
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (journal) {
      reset({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
      });
    }
  }, [journal, reset]);

  return (
    <AppDrawer
      title={isEditing ? "Edit Journal" : "View Journal"}
      open={open}
      onOpenChange={handleOpenChange}
      showFooter={isEditing}
      onSubmit={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      submitText={isSubmitting || isUpdating ? "Saving..." : "Save Changes"}
      cancelText={"Cancel"}
    >
      {isLoading ? (
        <ViewJournalSkeleton />
      ) : isEditing ? (
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <EditForm />
          </form>
        </FormProvider>
      ) : (
        <ReadOnlyForm journal={journal} setIsEditing={setIsEditing} />
      )}
    </AppDrawer>
  );
};

export default ViewJournalDrawer;

function ViewJournalSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header: Mood Badge & Delete Button */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4" />
        {/* Date */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-linear-to-r from-border via-border/50 to-transparent" />

      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Button */}
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
