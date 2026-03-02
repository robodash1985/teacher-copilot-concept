"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { SplitPanelLayout } from "@/components/layout/SplitPanelLayout";
import { ChatPanel } from "@/components/layout/ChatPanel";
import { CanvasPanel } from "@/components/layout/CanvasPanel";
import { DynamicBlockNoteEditor } from "@/components/smart-docs/DynamicBlockNoteEditor";
import { useTabs } from "@/contexts/TabContext";
import {
  smartDocsInitialMessages,
  smartDocsSuggestionMap,
  smartDocsBlocks,
  smartDocsImageBlock,
} from "@/lib/mock-data";
import { convertBlocksToBlockNote } from "@/lib/blocknote-mock-data";
import type { CanvasTab, ChatMessage, EditorBlock } from "@/types";

let msgCounter = 0;

export default function SmartDocsPage() {
  const { openTab } = useTabs();
  const [conversation, setConversation] = useState<ChatMessage[]>(smartDocsInitialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [tabs] = useState<CanvasTab[]>([
    { id: "document", label: "เอกสาร" },
  ]);
  const [activeTab, setActiveTab] = useState("document");

  useEffect(() => {
    openTab("smart-docs");
  }, [openTab]);

  const handleResponse = useCallback(
    (text: string) => {
      if (isTyping) return;

      const response = smartDocsSuggestionMap[text];
      if (!response) return;

      // Track canvas changes
      if (text === "เพิ่มรูปภาพประกอบ" || text === "เพิ่มรูปเซลล์สัตว์") {
        setHasImage(true);
        setEditorKey((k) => k + 1);
      }

      // Add user message immediately
      const userId = `user-${++msgCounter}`;
      setConversation((prev) => [
        ...prev,
        { id: userId, role: "user", content: text, step: 0 },
      ]);

      // Typing delay then AI response
      setIsTyping(true);
      setTimeout(() => {
        const aiId = `ai-${++msgCounter}`;
        setConversation((prev) => [
          ...prev,
          {
            id: aiId,
            role: "ai",
            content: response.aiContent,
            actions: response.actions,
            embed: response.embed,
            suggestions: response.suggestions,
            step: 0,
          },
        ]);
        setIsTyping(false);
      }, 800);
    },
    [isTyping]
  );

  const handleSendMessage = useCallback(
    (message: string) => handleResponse(message),
    [handleResponse]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => handleResponse(suggestion),
    [handleResponse]
  );

  // Build document blocks based on whether image was added
  const currentBlocks: EditorBlock[] = hasImage
    ? [...smartDocsBlocks.slice(0, 9), smartDocsImageBlock, ...smartDocsBlocks.slice(9)]
    : smartDocsBlocks;

  const blockNoteBlocks = useMemo(
    () => convertBlocksToBlockNote(currentBlocks),
    [hasImage]
  );

  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <SplitPanelLayout
        leftPanel={
          <ChatPanel
            messages={conversation}
            onSendMessage={handleSendMessage}
            onSuggestionClick={handleSuggestionClick}
            isTyping={isTyping}
          />
        }
        rightPanel={
          <CanvasPanel tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === "document" && (
              <DynamicBlockNoteEditor
                key={editorKey}
                initialBlocks={blockNoteBlocks}
              />
            )}
          </CanvasPanel>
        }
      />
    </div>
  );
}
