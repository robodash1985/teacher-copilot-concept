"use client";

import type { CanvasTab } from "@/types";

interface CanvasPanelProps {
  tabs: CanvasTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function CanvasPanel({ tabs, activeTab, onTabChange, children, actions }: CanvasPanelProps) {
  return (
    <>
      {/* Tab bar */}
      <div className="h-12 border-b border-[#e8ddd3] flex items-center px-4 shrink-0">
        <div className="flex items-center gap-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-[#f5f0eb] text-[#3d3530] font-medium"
                  : "text-[#8a7e74] hover:text-[#3d3530] hover:bg-[#f5f0eb]/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">{children}</div>
    </>
  );
}
