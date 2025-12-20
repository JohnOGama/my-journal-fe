import { Input, Label } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import { EditJournalSchemaT } from "./ViewJournalDrawer";
import AppSelect from "@/components/AppSelect";
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

const EditForm = () => {
  const form = useFormContext<EditJournalSchemaT>();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div>
      {/* Title Field */}
      <div className="space-y-2">
        <Label
          htmlFor="title"
          className="text-muted-foreground/70 text-[11px] font-semibold tracking-widest uppercase"
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
          className="text-muted-foreground/70 text-[11px] font-semibold tracking-widest uppercase"
        >
          Mood
        </Label>
        <AppSelect
          triggerPlaceholder="Select a mood"
          options={MOOD_OPTIONS}
          onValueChange={(value) => {
            form.setValue("mood", value);
          }}
          className="w-full"
          contentClassName="h-[200px]"
        />
      </div>

      {/* Content Field */}
      <div className="space-y-2">
        <Label
          htmlFor="content"
          className="text-muted-foreground/70 text-[11px] font-semibold tracking-widest uppercase"
        >
          Journal Entry
        </Label>
        <LazyRichTextEditor
          onChange={(value: string) => {
            form.setValue("content", value);
          }}
          savedJson={JSON.stringify(form.getValues("content"))}
        />
      </div>
    </div>
  );
};

export default EditForm;
