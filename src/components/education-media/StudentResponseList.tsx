"use client";

import type { StudentResponse } from "@/types";
import { Badge } from "@/components/ui/badge";

interface StudentResponseListProps {
  responses: StudentResponse[];
}

const statusConfig = {
  completed: { label: "เสร็จแล้ว", variant: "default" as const, className: "bg-green-100 text-green-700 hover:bg-green-100" },
  in_progress: { label: "กำลังทำ", variant: "default" as const, className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
  not_started: { label: "ยังไม่เริ่ม", variant: "default" as const, className: "bg-gray-100 text-gray-500 hover:bg-gray-100" },
};

export function StudentResponseList({ responses }: StudentResponseListProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e8ddd3]">
      <div className="px-5 py-3.5 border-b border-[#e8ddd3]">
        <h3 className="text-sm font-semibold text-[#3d3530]">คำตอบนักเรียน</h3>
      </div>
      <div className="divide-y divide-[#e8ddd3]/50">
        {responses.map((r) => {
          const status = statusConfig[r.status];
          return (
            <div key={r.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#f5f0eb]/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c4704b]/15 to-[#d4956a]/15 flex items-center justify-center text-xs font-medium text-[#c4704b]">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#3d3530]">{r.name}</p>
                  {r.submittedAt && (
                    <p className="text-xs text-[#8a7e74]">ส่งเมื่อ {r.submittedAt}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {r.status === "completed" && (
                  <span className="text-sm font-semibold text-[#3d3530]">
                    {r.score}/{r.total}
                  </span>
                )}
                <Badge variant={status.variant} className={status.className}>
                  {status.label}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
