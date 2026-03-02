"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { AiActionMessage } from "@/components/chat/AiActionMessage";
import { AiEmbedMessage } from "@/components/chat/AiEmbedMessage";
import { SuggestionChips } from "@/components/chat/SuggestionChips";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onSuggestionClick: (suggestion: string) => void;
  isTyping?: boolean;
}

export function ChatPanel({
  messages,
  onSendMessage,
  onSuggestionClick,
  isTyping,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const lastAiMessage = [...messages].reverse().find((m) => m.role === "ai");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, isTyping]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <>
      {/* Chat header */}
      <div className="h-12 px-4 flex items-center border-b border-[#e8ddd3] shrink-0">
        <span className="text-[#8a7e74] text-sm font-medium">Chat</span>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scrollbar p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="animate-fade-in-up">
            {msg.role === "user" ? (
              <MessageBubble role="user" content={msg.content!} />
            ) : (
              <div className="space-y-2">
                {msg.content && <MessageBubble role="ai" content={msg.content} />}
                {msg.actions?.map((action, i) => (
                  <AiActionMessage key={i} label={action.label} icon={action.icon} />
                ))}
                {msg.embed && <AiEmbedMessage embed={msg.embed} />}
                {msg.suggestions &&
                  msg === lastAiMessage &&
                  !isTyping && (
                    <SuggestionChips
                      suggestions={msg.suggestions}
                      onSelect={onSuggestionClick}
                    />
                  )}
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input area */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
      />
    </>
  );
}
