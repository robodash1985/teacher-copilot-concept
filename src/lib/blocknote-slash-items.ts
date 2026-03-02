import type { AppSchema } from "./blocknote-schema";
import type { BlockNoteEditor } from "@blocknote/core";
import type { DefaultReactSuggestionItem } from "@blocknote/react";
import {
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";

export function getCustomSlashMenuItems(
  editor: BlockNoteEditor<AppSchema["blockSchema"], AppSchema["inlineContentSchema"], AppSchema["styleSchema"]>,
  onFileUpload: () => void
): DefaultReactSuggestionItem[] {
  const defaults = getDefaultReactSlashMenuItems(editor as any) as DefaultReactSuggestionItem[];

  const fileItem: DefaultReactSuggestionItem = {
    title: "File",
    subtext: "Upload a document and extract content",
    group: "AI Tools",
    onItemClick: () => {
      onFileUpload();
    },
    aliases: ["file", "upload", "document"],
    badge: undefined,
  };

  const imageItem: DefaultReactSuggestionItem = {
    title: "AI Image",
    subtext: "Generate an image with AI",
    group: "AI Tools",
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.insertBlocks(
        [
          {
            type: "generatedImage" as any,
            props: { label: "AI Generated Image" },
          },
        ],
        currentBlock,
        "after"
      );
    },
    aliases: ["image", "picture", "ai-image", "generate"],
    badge: undefined,
  };

  return [...defaults, fileItem, imageItem];
}
