"use client";

import { TopNav } from "@/components/layout/TopNav";
import { useTabs } from "@/contexts/TabContext";
import { FileText, School, Sparkles, Send } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const { openTab } = useTabs();

  return (
    <div className="h-screen flex flex-col">
      <TopNav />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 pt-24 pb-16 space-y-10">
          {/* Hero */}
          <div className="space-y-3">
            <h1 className="text-4xl font-heading font-bold text-[#3d3530] leading-tight">
              มาเริ่มสร้างสื่อการสอนกัน
            </h1>
            <p className="text-[#8a7e74] text-sm">
              Teacher Copilot ผู้ช่วยอัจฉริยะสำหรับคุณครู สร้างเอกสาร แบบทดสอบ และสื่อการสอนด้วย AI
            </p>
          </div>

          {/* Chat input card */}
          <div className="bg-white rounded-2xl border border-[#e8ddd3] shadow-sm p-4 space-y-3">
            <input
              type="text"
              readOnly
              placeholder="วันนี้ต้องการสร้างอะไรคะ?"
              className="w-full bg-transparent text-[#3d3530] text-base placeholder:text-[#8a7e74]/50 outline-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#8a7e74] border border-[#e8ddd3] rounded-lg">
                  <Image src="/logo.svg" alt="" width={14} height={14} />
                  Teacher Copilot
                </span>
              </div>
              <button
                onClick={() => openTab("smart-docs")}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-[#c4704b] text-white hover:bg-[#b5603d] transition-colors font-medium"
              >
                เริ่มเลย
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pick a task */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-[#8a7e74]">
              <Sparkles className="w-4 h-4" />
              <span>เลือกสิ่งที่ต้องการ</span>
            </div>

            <button
              onClick={() => openTab("smart-docs")}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-[#f5f0eb] transition-colors text-left group border-b border-[#e8ddd3]"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c4704b] to-[#d4956a] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3d3530] group-hover:text-[#c4704b] transition-colors">
                  Smart Docs — สร้างเอกสารสรุปบทเรียน
                </p>
                <p className="text-xs text-[#8a7e74] mt-0.5">
                  ใบงาน สื่อการสอน พร้อมรูปภาพจาก AI
                </p>
              </div>
            </button>

            <button
              onClick={() => openTab("education-media")}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-[#f5f0eb] transition-colors text-left group border-b border-[#e8ddd3]"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4956a] to-[#c4704b] flex items-center justify-center shrink-0">
                <School className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#3d3530] group-hover:text-[#c4704b] transition-colors">
                  Education Media — สร้างแบบทดสอบออนไลน์
                </p>
                <p className="text-xs text-[#8a7e74] mt-0.5">
                  พร้อม Dashboard ติดตามผลนักเรียน
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
