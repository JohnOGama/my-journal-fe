import { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";

export const editorConfig: InitialConfigType = {
  namespace: "MyJournalEditor",
  theme: {
    paragraph: "text-sm leading-6",
    heading: {
      h1: "text-2xl font-bold",
      h2: "text-xl font-semibold",
    },
  },
  onError(error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    LinkNode,
  ],
};
