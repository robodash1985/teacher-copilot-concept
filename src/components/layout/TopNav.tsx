"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, X, MessageCircle } from "lucide-react";
import { useTabs } from "@/contexts/TabContext";

interface TopNavProps {
  rightActions?: React.ReactNode;
}

export function TopNav({ rightActions }: TopNavProps) {
  const { tabs, activeTabId, switchTab, closeTab } = useTabs();

  return (
    <header className="h-12 border-b border-[#e8ddd3] bg-[#faf9f7] flex items-center px-4 shrink-0">
      {/* Left — logo + add button */}
      <div className="flex items-center gap-2 w-48 shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={24} height={24} />
        </Link>
      </div>

      {/* Center — tabs */}
      <nav className="flex-1 flex items-center justify-center gap-1">
      <Link
          href="/"
          className="w-7 h-7 flex items-center justify-center rounded-md text-[#8a7e74] hover:text-[#3d3530] hover:bg-[#f5f0eb] transition-colors shrink-0"
          title="งานใหม่"
        >
          <Plus className="w-4 h-4" />
        </Link>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`group flex items-center gap-2 pl-3 pr-1.5 py-1.5 text-sm rounded-lg transition-colors shrink-0 ${
                isActive
                  ? "bg-white text-[#3d3530] shadow-sm border border-[#e8ddd3]"
                  : "text-[#8a7e74] hover:text-[#3d3530] hover:bg-[#f5f0eb]"
              }`}
            >
              <span className={isActive ? "text-[#c4704b]" : "text-[#8a7e74]"}>
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs">{tab.label}</span>
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="w-5 h-5 flex items-center justify-center rounded hover:bg-[#e8ddd3] transition-colors opacity-0 group-hover:opacity-100 shrink-0"
              >
                <X className="w-3 h-3" />
              </span>
            </button>
          );
        })}

      </nav>

      {/* Right — actions + user avatar */}
      <div className="w-48 flex items-center justify-end gap-3 shrink-0">
        {rightActions && <div className="flex items-center gap-2">{rightActions}</div>}
        <div className="w-8 h-8 rounded-full bg-[#c4704b] flex items-center justify-center text-white text-xs font-semibold shrink-0">
          T
        </div>
      </div>
    </header>
  );
}
