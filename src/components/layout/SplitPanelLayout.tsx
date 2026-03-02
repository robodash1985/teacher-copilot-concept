"use client";

interface SplitPanelLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function SplitPanelLayout({ leftPanel, rightPanel }: SplitPanelLayoutProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Chat Panel - Left */}
      <div className="w-[30%] shrink-0 bg-chat-bg flex flex-col border-r border-[#e8ddd3]">
        {leftPanel}
      </div>
      {/* Canvas Panel - Right */}
      <div className="flex-1 bg-[#faf9f7] flex flex-col overflow-hidden">
        {rightPanel}
      </div>
    </div>
  );
}
