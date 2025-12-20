import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { editorConfig } from "./config/editorConfig";
import { cn } from "@/libs/shadcn";

export default function RenderedRichText({ savedJson, className }: { savedJson: string, className?: string }) {
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: savedJson,
        editable: false,
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable className={cn("outline-none", className)} />}
        placeholder={null}
        ErrorBoundary={({ children }) => <>{children}</>}
      />
    </LexicalComposer>
  );
}
