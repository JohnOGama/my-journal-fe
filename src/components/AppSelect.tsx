import { cn } from "@/libs/shadcn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui";

interface AppSelectProps {
  triggerPlaceholder: string;
  options: { label: string; value: string }[];
  className?: string;
  contentClassName?: string;
  onValueChange: (value: string) => void;
}

const AppSelect = ({
  triggerPlaceholder,
  options,
  onValueChange,
  className,
  contentClassName,
}: AppSelectProps) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={triggerPlaceholder} />
      </SelectTrigger>
      <SelectContent className={cn("w-full", contentClassName)}>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
