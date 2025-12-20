import {
  BoldIcon,
  Highlighter,
  ItalicIcon,
  RedoDot,
  UnderlineIcon,
  UndoDot,
} from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  TextFormatType,
  UNDO_COMMAND,
} from "lexical";
import { Button, ButtonVariant } from "../ui";
import { useToolbarState } from "./config/useToolbarState";
import { cn } from "@/libs/shadcn";

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const { isBold, isItalic, isUnderline, isHighlight } = useToolbarState();

  const getButtonActiveState = (label: string) => {
    switch (label) {
      case "Bold":
        return isBold;
      case "Italic":
        return isItalic;
      case "Underline":
        return isUnderline;
      case "Highlight":
        return isHighlight;
      default:
        return false;
    }
  };

  return (
    <div className="border-border flex items-center border-b">
      {ToolbarButtons.map((button) => {
        const isActive = getButtonActiveState(button.label);
        return (
          <Button
            key={button.label}
            variant={button.variant as ButtonVariant}
            onClick={() =>
              editor.dispatchCommand(
                button.command,
                button.argument
                  ? (button.argument as TextFormatType)
                  : undefined,
              )
            }
            type="button"
            className={cn(isActive && "bg-accent text-accent-foreground")}
            aria-pressed={isActive}
          >
            {button.icon}
          </Button>
        );
      })}
    </div>
  );
}

const ToolbarButtons = [
  {
    label: "Bold",
    icon: <BoldIcon />,
    command: FORMAT_TEXT_COMMAND,
    argument: "bold",
    variant: "ghost",
  },
  {
    label: "Italic",
    icon: <ItalicIcon />,
    command: FORMAT_TEXT_COMMAND,
    argument: "italic",
    variant: "ghost",
  },
  {
    label: "Underline",
    icon: <UnderlineIcon />,
    command: FORMAT_TEXT_COMMAND,
    argument: "underline",
    variant: "ghost",
  },
  {
    label: "Highlight",
    icon: <Highlighter />,
    command: FORMAT_TEXT_COMMAND,
    argument: "highlight",
    variant: "ghost",
  },
  {
    label: "Redo",
    icon: <RedoDot />,
    command: REDO_COMMAND,
    variant: "ghost",
  },
  {
    label: "Undo",
    icon: <UndoDot />,
    command: UNDO_COMMAND,
    variant: "ghost",
  },
];
