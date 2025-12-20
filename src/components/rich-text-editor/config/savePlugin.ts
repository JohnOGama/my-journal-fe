"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export function SavePlugin({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const json = JSON.stringify(editorState.toJSON());
        onChange(json);
      });
    });
  }, [editor, onChange]);

  return null;
}
