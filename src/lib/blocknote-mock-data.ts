import type { EditorBlock } from "@/types";
import type { AppSchema } from "./blocknote-schema";
import type { PartialBlock } from "@blocknote/core";

export function convertBlocksToBlockNote(
  blocks: EditorBlock[]
): PartialBlock<AppSchema["blockSchema"], AppSchema["inlineContentSchema"], AppSchema["styleSchema"]>[] {
  const result: PartialBlock<AppSchema["blockSchema"], AppSchema["inlineContentSchema"], AppSchema["styleSchema"]>[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "heading":
        result.push({
          type: "heading",
          props: { level: (block.level ?? 1) as 1 | 2 | 3 },
          content: block.content,
        });
        break;

      case "paragraph":
        result.push({
          type: "paragraph",
          content: block.content,
        });
        break;

      case "reference":
        result.push({
          type: "paragraph",
          content: [
            {
              type: "documentRef",
              props: { name: block.refName ?? "" },
            },
          ],
        });
        break;

      case "image":
        result.push({
          type: "generatedImage",
          props: { label: block.imageLabel ?? "" },
        });
        break;

      case "separator":
        // Omitted — BlockNote spacing is sufficient
        break;

      case "sceneBeat":
        result.push({
          type: "sceneBeat",
          props: {
            text: block.content ?? "",
            targetCharCount: String(block.targetCharCount ?? 500),
            chapterId: block.chapterId ?? "",
            chapterLabel: block.chapterLabel ?? "",
          },
        });
        break;
    }
  }

  return result;
}
