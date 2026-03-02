"use client";

import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { StatsCard } from "./StatsCard";
import { StudentResponseList } from "./StudentResponseList";
import { StudentsTab } from "./StudentsTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { SettingsTab } from "./SettingsTab";
import { dashboardStats, studentResponses } from "@/lib/mock-data";
import { Eye, Link, Share2 } from "lucide-react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "students", label: "Students", icon: "users" },
  { id: "data", label: "Data", icon: "database" },
  { id: "analytics", label: "Analytics", icon: "bar-chart-3" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function OverviewSection() {
  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      {/* Page header */}
      <div>
        <h2 className="text-lg font-semibold text-[#3d3530]">Overview</h2>
        <p className="text-sm text-[#8a7e74] mt-1">แบบทดสอบสมการเชิงเส้น — คณิตศาสตร์ ม.3</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.label} data={stat} />
        ))}
      </div>

      {/* Quiz overview card */}
      <div className="bg-white rounded-xl border border-[#e8ddd3] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-[#3d3530]">แบบทดสอบสมการเชิงเส้น</h3>
            <p className="text-sm text-[#8a7e74] mt-1">
              คณิตศาสตร์ ม.3 — 10 ข้อ
            </p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-medium">
            <Eye className="w-3 h-3" />
            เปิดใช้งาน
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[#f5f0eb] rounded-lg px-4 py-2.5 text-xs text-[#8a7e74]">
            <Link className="w-3.5 h-3.5" />
            <span className="truncate">teacher-copilot.app/quiz/math-linear-eq</span>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2.5 text-xs rounded-lg bg-[#c4704b] text-white hover:bg-[#c4704b]/90 transition-colors font-medium">
            <Share2 className="w-3 h-3" />
            Share
          </button>
        </div>
      </div>

      {/* Student responses */}
      <StudentResponseList responses={studentResponses} />
    </div>
  );
}

function DataSection() {
  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-[#3d3530]">Data</h2>
        <p className="text-sm text-[#8a7e74] mt-1">ข้อมูลคำถามและเฉลย — แบบทดสอบสมการเชิงเส้น</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e8ddd3]">
        <div className="grid grid-cols-[40px_1fr_1fr_80px] gap-4 px-5 py-3 border-b border-[#e8ddd3] text-xs text-[#8a7e74] font-medium">
          <span>ข้อ</span>
          <span>คำถาม</span>
          <span>เฉลย</span>
          <span className="text-center">ตอบถูก</span>
        </div>
        {[
          { id: 1, q: "2x + 6 = 14, x = ?", ans: "ข. x = 4", rate: "87%" },
          { id: 2, q: "3x - 9 = 0, x = ?", ans: "ค. x = 3", rate: "75%" },
          { id: 3, q: "5x + 3 = 2x + 15, x = ?", ans: "ข. x = 4", rate: "62%" },
          { id: 4, q: "ข้อใดเป็นสมการเชิงเส้นตัวแปรเดียว?", ans: "ข. 3x + 7 = 22", rate: "50%" },
          { id: 5, q: "4(x - 2) = 12, x = ?", ans: "ค. x = 5", rate: "87%" },
          { id: 6, q: "x/3 + 2 = 5, x = ?", ans: "ข. x = 9", rate: "37%" },
          { id: 7, q: "7x - 3 = 4x + 9, x = ?", ans: "ค. x = 4", rate: "75%" },
          { id: 8, q: "2(3x + 1) = 20, x = ?", ans: "ข. x = 3", rate: "62%" },
          { id: 9, q: "x + x + x = 27, x = ?", ans: "ค. x = 9", rate: "87%" },
          { id: 10, q: "6x - 4 = 2x + 8, x = ?", ans: "ข. x = 3", rate: "75%" },
        ].map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[40px_1fr_1fr_80px] gap-4 items-center px-5 py-3.5 border-b border-[#e8ddd3]/50 last:border-b-0 text-sm hover:bg-[#f5f0eb]/50 transition-colors"
          >
            <span className="text-[#8a7e74] text-xs">{row.id}</span>
            <span className="text-[#3d3530] truncate">{row.q}</span>
            <span className="text-[#8a7e74] truncate">{row.ans}</span>
            <span className="text-center text-xs font-medium text-[#c4704b]">{row.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuizDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex h-full">
      <DashboardSidebar
        items={sidebarItems}
        activeId={activeSection}
        onSelect={setActiveSection}
      />

      {activeSection === "overview" && <OverviewSection />}
      {activeSection === "students" && <StudentsTab />}
      {activeSection === "data" && <DataSection />}
      {activeSection === "analytics" && <AnalyticsTab />}
      {activeSection === "settings" && <SettingsTab />}
    </div>
  );
}
