"use client";

import { useState, useMemo } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { SuggestionMenuController } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { schema } from "@/lib/blocknote-schema";
import type { AppSchema } from "@/lib/blocknote-schema";
import { getCustomSlashMenuItems } from "@/lib/blocknote-slash-items";
import { FileUploadDialog } from "./FileUploadDialog";
import type { PartialBlock } from "@blocknote/core";

interface BlockNoteEditorProps {
  initialBlocks: PartialBlock<AppSchema["blockSchema"], AppSchema["inlineContentSchema"], AppSchema["styleSchema"]>[];
}

export function BlockNoteEditor({ initialBlocks }: BlockNoteEditorProps) {
  const [fileDialogOpen, setFileDialogOpen] = useState(false);

  const editor = useCreateBlockNote({
    schema,
    initialContent: initialBlocks.length > 0 ? initialBlocks as any : undefined,
  });

  const handleFileSelect = (fileName: string) => {
    const currentBlock = editor.getTextCursorPosition().block;

    // Insert reference badge inline in a paragraph
    editor.insertBlocks(
      [
        {
          type: "paragraph" as const,
          content: [
            {
              type: "documentRef" as any,
              props: { name: fileName.replace(/\.[^/.]+$/, "") },
            },
          ],
        },
        {
          type: "paragraph" as const,
          content: `[Extracted content from ${fileName.replace(/\.[^/.]+$/, "")}] — เนื้อหาที่สกัดจากเอกสารจะปรากฏที่นี่`,
        },
      ],
      currentBlock,
      "after"
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <BlockNoteView
        editor={editor}
        theme="light"
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter="/"
          getItems={async (query) => {
            const items = getCustomSlashMenuItems(
              editor as any,
              () => setFileDialogOpen(true)
            );
            return items.filter(
              (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                (item.aliases?.some((a: string) =>
                  a.toLowerCase().includes(query.toLowerCase())
                ) ?? false)
            );
          }}
        />
      </BlockNoteView>

      <FileUploadDialog
        open={fileDialogOpen}
        onClose={() => setFileDialogOpen(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
}
