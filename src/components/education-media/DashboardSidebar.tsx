"use client";

import { LayoutDashboard, Users, Database, BarChart3, Settings, Search } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "layout-dashboard": <LayoutDashboard className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  "bar-chart-3": <BarChart3 className="w-4 h-4" />,
  settings: <Settings className="w-4 h-4" />,
};

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function DashboardSidebar({ items, activeId, onSelect }: DashboardSidebarProps) {
  return (
    <div className="w-56 border-r border-[#e8ddd3] bg-[#faf9f7] p-4 space-y-4 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-[#e8ddd3] rounded-lg px-3 py-2">
        <Search className="w-3.5 h-3.5 text-[#8a7e74]" />
        <input
          type="text"
          readOnly
          placeholder="Search..."
          className="flex-1 bg-transparent text-xs text-[#3d3530] placeholder:text-[#8a7e74]/50 outline-none"
        />
      </div>

      {/* Nav items */}
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeId === item.id
                ? "bg-white text-[#c4704b] font-medium shadow-sm border border-[#e8ddd3]"
                : "text-[#8a7e74] hover:text-[#3d3530] hover:bg-white/60"
            }`}
          >
            {iconMap[item.icon]}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
