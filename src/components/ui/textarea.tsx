import * as React from "react";
import { cn } from "@/libs/shadcn";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: string;
  isErrorVisible?: boolean;
}

function Textarea({
  className,
  error = "",
  isErrorVisible = true,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-destructive",
          className
        )}
        {...props}
      />
      {error && isErrorVisible && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export { Textarea };
