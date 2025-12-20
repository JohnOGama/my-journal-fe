import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { editorConfig } from "./config/editorConfig";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { Toolbar } from "./Toolbar";

// Plugins
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { SavePlugin } from "./config/savePlugin";

export default function RichTextEditor({
  onChange,
  type = "editable",
  jsonContent,
}: {
  onChange: (value: string) => void;
  type?: "editable" | "readonly";
  jsonContent?: string;
}) {
  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editable: type === "editable",
        editorState: type === "readonly" ? jsonContent : undefined,
      }}
    >
      <div className="border-border bg-input/30 relative rounded-md border">
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[200px] p-3 text-sm outline-none" />
          }
          placeholder={
            <div className="text-muted-foreground pointer-events-none absolute top-12 left-3 text-sm">
              Write your journal...
            </div>
          }
          ErrorBoundary={({ children }) => <div>{children}</div>}
        />
      </div>
      <HistoryPlugin />
      <SavePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
