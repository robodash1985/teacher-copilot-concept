"use client";

import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="flex items-center gap-1 pt-2">
        <span className="w-2 h-2 rounded-full bg-[#c4704b]/40 typing-dot" />
        <span className="w-2 h-2 rounded-full bg-[#c4704b]/40 typing-dot" />
        <span className="w-2 h-2 rounded-full bg-[#c4704b]/40 typing-dot" />
      </div>
    </div>
  );
}
