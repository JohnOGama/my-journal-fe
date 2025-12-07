"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AppDrawer from "../AppDrawer";
import { Button, Input, Textarea } from "../ui";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateJournal } from "@/features/journal/mutations";

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
    <AppDrawer
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
        <Input
          {...register("mood")}
          error={errors.mood?.message}
          placeholder="Mood"
        />
        <Textarea
          {...register("content")}
          error={errors.content?.message}
          placeholder="Journal Content"
          className="h-[300px]"
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
    </AppDrawer>
  );
};

export default CreateJournalDrawer;
