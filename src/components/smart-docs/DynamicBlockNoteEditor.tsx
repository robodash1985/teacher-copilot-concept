"use client";

import dynamic from "next/dynamic";
import type { AppSchema } from "@/lib/blocknote-schema";
import type { PartialBlock } from "@blocknote/core";

const BlockNoteEditor = dynamic(
  () =>
    import("./BlockNoteEditor").then((mod) => mod.BlockNoteEditor),
  { ssr: false }
);

interface DynamicBlockNoteEditorProps {
  initialBlocks: PartialBlock<AppSchema["blockSchema"], AppSchema["inlineContentSchema"], AppSchema["styleSchema"]>[];
}

export function DynamicBlockNoteEditor({ initialBlocks }: DynamicBlockNoteEditorProps) {
  return <BlockNoteEditor initialBlocks={initialBlocks} />;
}
