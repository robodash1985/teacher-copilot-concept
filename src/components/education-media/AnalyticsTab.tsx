"use client";

import { BarChart, TrendingUp, Target, Clock, Award } from "lucide-react";
import { studentResponses } from "@/lib/mock-data";

const questionStats = [
  { id: 1, correct: 7, total: 8, label: "ข้อ 1" },
  { id: 2, correct: 6, total: 8, label: "ข้อ 2" },
  { id: 3, correct: 5, total: 8, label: "ข้อ 3" },
  { id: 4, correct: 4, total: 8, label: "ข้อ 4" },
  { id: 5, correct: 7, total: 8, label: "ข้อ 5" },
  { id: 6, correct: 3, total: 8, label: "ข้อ 6" },
  { id: 7, correct: 6, total: 8, label: "ข้อ 7" },
  { id: 8, correct: 5, total: 8, label: "ข้อ 8" },
  { id: 9, correct: 7, total: 8, label: "ข้อ 9" },
  { id: 10, correct: 6, total: 8, label: "ข้อ 10" },
];

const scoreDistribution = [
  { range: "9-10", count: 2 },
  { range: "7-8", count: 2 },
  { range: "5-6", count: 1 },
  { range: "3-4", count: 0 },
  { range: "0-2", count: 0 },
];

export function AnalyticsTab() {
  const completed = studentResponses.filter((s) => s.status === "completed");
  const avgScore = completed.length
    ? (completed.reduce((sum, s) => sum + s.score, 0) / completed.length).toFixed(1)
    : "0";
  const highScore = completed.length ? Math.max(...completed.map((s) => s.score)) : 0;
  const lowScore = completed.length ? Math.min(...completed.map((s) => s.score)) : 0;

  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-[#3d3530]">Analytics</h2>
        <p className="text-sm text-[#8a7e74] mt-1">วิเคราะห์ผลสอบ — แบบทดสอบสมการเชิงเส้น</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl border border-[#e8ddd3] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8a7e74]">คะแนนเฉลี่ย</span>
            <TrendingUp className="w-4 h-4 text-[#c4704b]" />
          </div>
          <p className="text-2xl font-bold text-[#3d3530]">{avgScore}</p>
          <p className="text-xs text-[#8a7e74] mt-1">จาก 10 คะแนน</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e8ddd3] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8a7e74]">คะแนนสูงสุด</span>
            <Award className="w-4 h-4 text-[#c4704b]" />
          </div>
          <p className="text-2xl font-bold text-[#3d3530]">{highScore}/10</p>
          <p className="text-xs text-[#8a7e74] mt-1">วิชัย ศรีสมร</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e8ddd3] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8a7e74]">คะแนนต่ำสุด</span>
            <Target className="w-4 h-4 text-[#c4704b]" />
          </div>
          <p className="text-2xl font-bold text-[#3d3530]">{lowScore}/10</p>
          <p className="text-xs text-[#8a7e74] mt-1">ธนพล ภูมิใจ</p>
        </div>
        <div className="bg-white rounded-xl border border-[#e8ddd3] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8a7e74]">เวลาเฉลี่ย</span>
            <Clock className="w-4 h-4 text-[#c4704b]" />
          </div>
          <p className="text-2xl font-bold text-[#3d3530]">8:32</p>
          <p className="text-xs text-[#8a7e74] mt-1">นาที</p>
        </div>
      </div>

      {/* Question difficulty */}
      <div className="bg-white rounded-xl border border-[#e8ddd3] p-6">
        <div className="flex items-center gap-2 mb-5">
          <BarChart className="w-4 h-4 text-[#c4704b]" />
          <h3 className="text-sm font-semibold text-[#3d3530]">อัตราตอบถูกรายข้อ</h3>
        </div>
        <div className="space-y-2.5">
          {questionStats.map((q) => {
            const pct = (q.correct / q.total) * 100;
            return (
              <div key={q.id} className="flex items-center gap-3">
                <span className="text-xs text-[#8a7e74] w-10 shrink-0">{q.label}</span>
                <div className="flex-1 bg-[#f5f0eb] rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c4704b] to-[#d4956a] rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${pct}%` }}
                  >
                    <span className="text-[10px] text-white font-medium">{pct.toFixed(0)}%</span>
                  </div>
                </div>
                <span className="text-xs text-[#8a7e74] w-12 text-right shrink-0">
                  {q.correct}/{q.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score distribution */}
      <div className="bg-white rounded-xl border border-[#e8ddd3] p-6">
        <h3 className="text-sm font-semibold text-[#3d3530] mb-5">การกระจายคะแนน</h3>
        <div className="flex items-end gap-3 h-32">
          {scoreDistribution.map((d) => {
            const maxCount = Math.max(...scoreDistribution.map((s) => s.count), 1);
            const height = (d.count / maxCount) * 100;
            return (
              <div key={d.range} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-[#3d3530]">{d.count}</span>
                <div className="w-full bg-[#f5f0eb] rounded-t-md relative" style={{ height: "100%" }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#c4704b] to-[#d4956a] rounded-t-md transition-all"
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#8a7e74]">{d.range}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
