"use client";

import { Globe, Clock, Lock, Shuffle, Eye, Bell } from "lucide-react";

const settingsSections = [
  {
    title: "ทั่วไป",
    items: [
      {
        icon: <Globe className="w-4 h-4" />,
        label: "การเข้าถึง",
        description: "เปิดให้นักเรียนเข้าทำแบบทดสอบ",
        type: "toggle" as const,
        enabled: true,
      },
      {
        icon: <Clock className="w-4 h-4" />,
        label: "จำกัดเวลา",
        description: "กำหนดเวลาในการทำแบบทดสอบ",
        type: "select" as const,
        value: "15 นาที",
      },
      {
        icon: <Shuffle className="w-4 h-4" />,
        label: "สุ่มข้อสอบ",
        description: "สลับลำดับข้อสอบแต่ละครั้งที่เข้าทำ",
        type: "toggle" as const,
        enabled: false,
      },
    ],
  },
  {
    title: "ความปลอดภัย",
    items: [
      {
        icon: <Lock className="w-4 h-4" />,
        label: "รหัสผ่าน",
        description: "กำหนดรหัสผ่านก่อนเข้าทำ",
        type: "toggle" as const,
        enabled: false,
      },
      {
        icon: <Eye className="w-4 h-4" />,
        label: "แสดงเฉลยหลังส่ง",
        description: "ให้นักเรียนดูเฉลยหลังส่งคำตอบ",
        type: "toggle" as const,
        enabled: true,
      },
    ],
  },
  {
    title: "การแจ้งเตือน",
    items: [
      {
        icon: <Bell className="w-4 h-4" />,
        label: "แจ้งเตือนเมื่อส่งคำตอบ",
        description: "รับการแจ้งเตือนเมื่อนักเรียนส่งคำตอบ",
        type: "toggle" as const,
        enabled: true,
      },
    ],
  },
];

export function SettingsTab() {
  return (
    <div className="flex-1 p-8 overflow-y-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-[#3d3530]">Settings</h2>
        <p className="text-sm text-[#8a7e74] mt-1">ตั้งค่าแบบทดสอบ — แบบทดสอบสมการเชิงเส้น</p>
      </div>

      {settingsSections.map((section) => (
        <div key={section.title} className="space-y-3">
          <h3 className="text-xs font-semibold text-[#8a7e74] uppercase tracking-wider">
            {section.title}
          </h3>
          <div className="bg-white rounded-xl border border-[#e8ddd3] divide-y divide-[#e8ddd3]">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-[#c4704b]">{item.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-[#3d3530]">{item.label}</p>
                    <p className="text-xs text-[#8a7e74] mt-0.5">{item.description}</p>
                  </div>
                </div>
                {item.type === "toggle" && (
                  <div
                    className={`w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${
                      item.enabled ? "bg-[#c4704b]" : "bg-[#e8ddd3]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        item.enabled ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                )}
                {item.type === "select" && (
                  <span className="text-sm text-[#3d3530] border border-[#e8ddd3] rounded-lg px-3 py-1.5">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
