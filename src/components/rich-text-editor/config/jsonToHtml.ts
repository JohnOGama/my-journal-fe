import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor, type CreateEditorArgs } from "lexical";
import { editorConfig } from "./editorConfig";

export function jsonToHtml(json: string) {
  const config: CreateEditorArgs = {
    namespace: editorConfig.namespace,
    nodes: editorConfig.nodes,
    onError: (error: Error) => {
      throw error;
    },
    theme: editorConfig.theme,
  };
  const editor = createEditor(config);
  const editorState = editor.parseEditorState(json);
  editor.setEditorState(editorState);

  let html = "";
  editor.update(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
}
