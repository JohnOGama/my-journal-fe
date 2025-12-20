"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AppModal from "../AppModal";
import { Button, Input } from "../ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateJournal } from "@/features/journal/mutations";
import AppSelect from "../AppSelect";
import { MOOD_OPTIONS } from "@/common/constants";
import dynamic from "next/dynamic";
const LazyRichTextEditor = dynamic(
  () => import("@/components/rich-text-editor/RichTextEditor"),
  {
    loading({ isLoading }) {
      if (isLoading) {
        return <div>Loading...</div>;
      }
    },
  },
);

const createJournalForm = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  mood: z.string().min(1, { message: "Mood is required" }),
});

type CreateJournalSchemaT = z.infer<typeof createJournalForm>;

const CreateJournalDrawer = () => {
  const [open, setOpen] = useState(false);
  const { createJournalAsync } = useCreateJournal();

  const form = useForm<CreateJournalSchemaT>({
    mode: "onChange",
    resolver: zodResolver(createJournalForm),
    defaultValues: {
      title: "",
      mood: "",
      content: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = async (data: CreateJournalSchemaT) => {
    await createJournalAsync(data);
    setOpen(false);
    form.reset();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          className="w-full bg-indigo-50 text-indigo-600"
          variant="default"
          size="icon"
        >
          New
        </Button>
      }
      title="Create Journal"
      description="Create a new journal entry"
      showFooter={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("title")}
          error={errors.title?.message}
          placeholder="Journal Title"
          className="font-medium placeholder:font-normal"
        />
        <AppSelect
          triggerPlaceholder="Select a mood"
          options={MOOD_OPTIONS}
          onValueChange={(value) => {
            form.setValue("mood", value);
          }}
          className="w-full"
          contentClassName="h-[200px]"
        />
        <LazyRichTextEditor
          onChange={(value: string) => {
            console.log("value", value);
            form.setValue("content", value);
          }}
        />
        <Button
          loading={isSubmitting}
          disabled={!isValid || !isDirty}
          type="submit"
          className="w-full"
        >
          {isSubmitting ? "Creating..." : "Create Journal"}
        </Button>
      </form>
    </AppModal>
  );
};

export default CreateJournalDrawer;
