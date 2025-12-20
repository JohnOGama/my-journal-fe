"use client";

import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $isElementNode } from "lexical";
import { $findMatchingParent } from "@lexical/utils";
import { $isHeadingNode } from "@lexical/rich-text";
import { $isListNode } from "@lexical/list";

export function useToolbarState() {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [blockType, setBlockType] = useState<
    "paragraph" | "h1" | "h2" | "bullet" | "number"
  >("paragraph");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        // Inline formats
        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
        setIsUnderline(selection.hasFormat("underline"));
        setIsHighlight(selection.hasFormat("highlight"));
        // Block formats
        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : $findMatchingParent(anchorNode, $isElementNode);

        if (!element) return;

        if ($isHeadingNode(element)) {
          setBlockType(element.getTag() as "h1" | "h2");
        } else if ($isListNode(element)) {
          setBlockType(element.getListType() as "bullet" | "number");
        } else {
          setBlockType("paragraph");
        }
      });
    });
  }, [editor]);

  return {
    isBold,
    isItalic,
    isUnderline,
    isHighlight,
    blockType,
  };
}
