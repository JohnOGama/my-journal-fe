import { Input, Label, Textarea } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import { EditJournalSchemaT } from "./ViewJournalDrawer";

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
    </div>
  );
};

export default EditForm;
