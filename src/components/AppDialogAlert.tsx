import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
} from "lucide-react";

export const AppDialogAlert = ({
  type,
  description,
}: {
  type: "info" | "warning" | "error" | "success";
  description: string;
}) => {
  return (
    <div className="bg-primary/10 border-primary/15 rounded-md border p-2">
      <div className="flex items-center gap-2">
        <div className="shrink-0">
          {type === "info" && <InfoIcon size={16} className="text-primary" />}
          {type === "warning" && (
            <AlertTriangleIcon size={16} className="text-primary" />
          )}
          {type === "error" && (
            <AlertCircleIcon size={16} className="text-primary" />
          )}
          {type === "success" && (
            <CheckCircleIcon size={16} className="text-primary" />
          )}
        </div>
        <p className="text-primary-foreground text-xs">{description}</p>
      </div>
    </div>
  );
};
