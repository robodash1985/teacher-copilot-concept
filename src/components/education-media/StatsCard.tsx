"use client";

import { Users, BarChart, CheckCircle, Clock } from "lucide-react";
import type { StatsCardData } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-5 h-5" />,
  "bar-chart": <BarChart className="w-5 h-5" />,
  "check-circle": <CheckCircle className="w-5 h-5" />,
  clock: <Clock className="w-5 h-5" />,
};

interface StatsCardProps {
  data: StatsCardData;
}

export function StatsCard({ data }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8ddd3] p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#8a7e74]">{data.label}</span>
        <span className="text-[#c4704b]">{iconMap[data.icon]}</span>
      </div>
      <p className="text-2xl font-bold text-[#3d3530]">{data.value}</p>
      {data.change && (
        <p className="text-xs text-[#8a7e74] mt-1.5">{data.change}</p>
      )}
    </div>
  );
}
