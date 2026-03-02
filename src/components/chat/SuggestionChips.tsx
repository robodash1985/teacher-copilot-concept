"use client";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="ml-9 flex flex-wrap gap-2 mt-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="px-3 py-1.5 text-xs rounded-full border border-[#c4704b]/30 text-[#c4704b] hover:bg-[#c4704b]/10 hover:border-[#c4704b]/50 transition-colors"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
