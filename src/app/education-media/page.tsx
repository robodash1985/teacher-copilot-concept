"use client";

import { useState, useCallback, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { SplitPanelLayout } from "@/components/layout/SplitPanelLayout";
import { ChatPanel } from "@/components/layout/ChatPanel";
import { CanvasPanel } from "@/components/layout/CanvasPanel";
import { QuizPreview } from "@/components/education-media/QuizPreview";
import { QuizDashboard } from "@/components/education-media/QuizDashboard";
import { useTabs } from "@/contexts/TabContext";
import {
  educationMediaInitialMessages,
  educationMediaSuggestionMap,
  quizData,
} from "@/lib/mock-data";
import { Globe } from "lucide-react";
import type { CanvasTab, ChatMessage } from "@/types";

let msgCounter = 0;

export default function EducationMediaPage() {
  const { openTab } = useTabs();
  const [conversation, setConversation] = useState<ChatMessage[]>(educationMediaInitialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [tabs] = useState<CanvasTab[]>([
    { id: "preview", label: "Preview" },
    { id: "dashboard", label: "Dashboard" },
  ]);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    openTab("education-media");
  }, [openTab]);

  const handleResponse = useCallback(
    (text: string) => {
      if (isTyping) return;

      const response = educationMediaSuggestionMap[text];
      if (!response) return;

      // Track canvas changes
      if (text === "สร้าง QR Code") {
        setShowQR(true);
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

  const publishButton = (
    <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-[#c4704b] text-white hover:bg-[#b5603d] transition-colors font-medium">
      <Globe className="w-3.5 h-3.5" />
      Publish
    </button>
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
          <CanvasPanel
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            actions={publishButton}
          >
            {activeTab === "preview" && (
              <QuizPreview quiz={quizData} showQR={showQR} />
            )}
            {activeTab === "dashboard" && <QuizDashboard />}
          </CanvasPanel>
        }
      />
    </div>
  );
}
