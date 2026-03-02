"use client";

import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "ai";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] flex items-start gap-2">
          <div className="bg-user-bubble text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-start to-accent-end flex items-center justify-center shrink-0 mt-0.5">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-[85%] text-[#3d3530] text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}
