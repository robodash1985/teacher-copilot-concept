"use client";

import { ArrowUp, Plus, ChevronDown } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className="px-3 pb-3 pt-2 shrink-0 space-y-1.5">
      <div className="bg-white border border-[#e8ddd3] rounded-2xl shadow-sm">
        {/* Text area */}
        <div className="px-4 pt-3 pb-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Reply..."
            className="w-full bg-transparent text-[#3d3530] text-sm placeholder:text-[#8a7e74]/50 outline-none"
          />
        </div>
        {/* Toolbar row */}
        <div className="flex items-center justify-between px-3 pb-2.5">
          {/* Left: + button */}
          <button className="w-7 h-7 rounded-lg border border-[#e8ddd3] flex items-center justify-center text-[#8a7e74] hover:bg-[#f5f0eb] transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          {/* Right: model selector + send */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-xs text-[#8a7e74] hover:text-[#5a524a] transition-colors">
              <span>GPT-4o</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button
              onClick={onSend}
              className="w-7 h-7 rounded-lg bg-[#c4704b] flex items-center justify-center hover:bg-[#b5603d] transition-colors"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      {/* Disclaimer */}
      <p className="text-[10px] text-[#8a7e74]/60 text-center">
        AI can make mistakes. Please double-check responses.
      </p>
    </div>
  );
}
