"use client";

import { studentResponses } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";

const statusConfig = {
  completed: { label: "เสร็จแล้ว", className: "bg-green-100 text-green-700 hover:bg-green-100" },
  in_progress: { label: "กำลังทำ", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
  not_started: { label: "ยังไม่เริ่ม", className: "bg-gray-100 text-gray-500 hover:bg-gray-100" },
};

export function StudentsTab() {
  const completed = studentResponses.filter((s) => s.status === "completed");
  const avgScore = completed.length
    ? (completed.reduce((sum, s) => sum + s.score, 0) / completed.length).toFixed(1)
    : "—";

  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#3d3530]">Students</h2>
          <p className="text-sm text-[#8a7e74] mt-1">
            ทั้งหมด {studentResponses.length} คน — คะแนนเฉลี่ย {avgScore}/10
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#e8ddd3] text-[#8a7e74] hover:bg-[#f5f0eb] transition-colors">
            <Filter className="w-3 h-3" />
            Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#e8ddd3] text-[#8a7e74] hover:bg-[#f5f0eb] transition-colors">
            <Download className="w-3 h-3" />
            Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-[#e8ddd3] rounded-lg px-4 py-2.5">
        <Search className="w-4 h-4 text-[#8a7e74]" />
        <input
          type="text"
          readOnly
          placeholder="ค้นหานักเรียน..."
          className="flex-1 bg-transparent text-sm text-[#3d3530] placeholder:text-[#8a7e74]/50 outline-none"
        />
      </div>

      {/* Student table */}
      <div className="bg-white rounded-xl border border-[#e8ddd3]">
        <div className="grid grid-cols-[1fr_100px_80px_100px] gap-4 px-5 py-3 border-b border-[#e8ddd3] text-xs text-[#8a7e74] font-medium">
          <span>ชื่อนักเรียน</span>
          <span className="text-center">คะแนน</span>
          <span className="text-center">เปอร์เซ็นต์</span>
          <span className="text-center">สถานะ</span>
        </div>
        {studentResponses.map((r) => {
          const status = statusConfig[r.status];
          const pct = r.status === "completed" ? `${(r.score / r.total * 100).toFixed(0)}%` : "—";
          return (
            <div
              key={r.id}
              className="grid grid-cols-[1fr_100px_80px_100px] gap-4 items-center px-5 py-3.5 border-b border-[#e8ddd3]/50 last:border-b-0 hover:bg-[#f5f0eb]/50 transition-colors"
            >
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
              <span className="text-sm text-center font-semibold text-[#3d3530]">
                {r.status === "completed" ? `${r.score}/${r.total}` : "—"}
              </span>
              <span className="text-sm text-center text-[#8a7e74]">{pct}</span>
              <div className="flex justify-center">
                <Badge variant="default" className={status.className}>
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
