"use client";

import type { QuizQuestion as QuizQuestionType } from "@/types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function QuizQuestion({ question, selectedIndex, onSelect }: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-gray-800">{question.question}</h3>
      <div className="space-y-2.5">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all ${
              selectedIndex === i
                ? "border-[#c4704b] bg-[#c4704b]/10 text-[#c4704b]"
                : "border-[#e8ddd3] hover:border-[#c4704b]/30 hover:bg-[#f5f0eb] text-[#3d3530]"
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                selectedIndex === i
                  ? "border-[#c4704b] bg-[#c4704b] text-white"
                  : "border-[#e8ddd3] text-[#8a7e74]"
              }`}
            >
              {choice.label}
            </span>
            <span>{choice.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
