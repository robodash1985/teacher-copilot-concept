"use client";

import { QrCode, Copy, CheckCircle, FileText, MessageCircle } from "lucide-react";
import { useQRCode } from "next-qrcode";

type EmbedType = "qr-code" | "line-link" | "dashboard-preview" | "table-preview" | "pdf-export";

interface AiEmbedMessageProps {
  embed: { type: EmbedType };
}

function QrCodeEmbed() {
  const { Canvas } = useQRCode();

  return (
    <div className="bg-white rounded-lg border border-[#e8ddd3] p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-medium text-[#8a7e74]">
        <QrCode className="w-3.5 h-3.5 text-[#c4704b]" />
        QR Code
      </div>
      <div className="flex justify-center">
        <div className="bg-white p-2 rounded-lg shadow-sm border border-[#e8ddd3]">
          <Canvas
            text="https://quiz.school.th/s/math-m3-eq01"
            options={{
              errorCorrectionLevel: "M",
              margin: 2,
              scale: 4,
              width: 120,
              color: {
                dark: "#3d3530",
                light: "#ffffff",
              },
            }}
          />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-medium text-[#5a524a]">แบบทดสอบสมการเชิงเส้น</p>
        <p className="text-[10px] text-[#8a7e74]">Scan to start</p>
      </div>
    </div>
  );
}

function LineLinkEmbed() {
  return (
    <div className="bg-[#06C755]/5 rounded-lg border border-[#06C755]/20 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#06C755] flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium text-[#5a524a]">Shared via LINE</span>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-md border border-[#e8ddd3] px-3 py-2">
        <span className="text-xs text-[#8a7e74] truncate flex-1 font-mono">
          https://quiz.school.th/s/math-m3-eq01
        </span>
        <button className="text-[#8a7e74] hover:text-[#c4704b] transition-colors shrink-0">
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-[10px] text-[#8a7e74]">ลิงก์ถูกส่งไปยังกลุ่ม LINE ห้อง ม.3/1 แล้ว</p>
    </div>
  );
}

function DashboardPreviewEmbed() {
  const stats = [
    { label: "นักเรียน", value: "8", icon: "👥" },
    { label: "คะแนนเฉลี่ย", value: "8.0", icon: "📊" },
    { label: "ทำเสร็จ", value: "5/8", icon: "✅" },
    { label: "กำลังทำ", value: "1", icon: "⏳" },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#e8ddd3] p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-medium text-[#8a7e74]">
        <span className="text-[#c4704b]">📈</span>
        Dashboard Preview
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#f5f0eb] rounded-md px-3 py-2 text-center"
          >
            <div className="text-sm font-semibold text-[#5a524a]">{stat.value}</div>
            <div className="text-[10px] text-[#8a7e74]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TablePreviewEmbed() {
  const rows = [
    { feature: "ผนังเซลล์", plant: "มี", animal: "ไม่มี" },
    { feature: "คลอโรพลาสต์", plant: "มี", animal: "ไม่มี" },
    { feature: "แวคิวโอล", plant: "ใหญ่", animal: "เล็ก/ไม่มี" },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#e8ddd3] p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-medium text-[#8a7e74]">
        <span className="text-[#c4704b]">📋</span>
        ตารางเปรียบเทียบเซลล์
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[#e8ddd3]">
            <th className="text-left py-1.5 px-2 text-[#8a7e74] font-medium">ลักษณะ</th>
            <th className="text-center py-1.5 px-2 text-[#c4704b] font-medium">เซลล์พืช</th>
            <th className="text-center py-1.5 px-2 text-[#c4704b] font-medium">เซลล์สัตว์</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-[#f5f0eb] last:border-0">
              <td className="py-1.5 px-2 text-[#5a524a]">{row.feature}</td>
              <td className="py-1.5 px-2 text-center text-[#5a524a]">{row.plant}</td>
              <td className="py-1.5 px-2 text-center text-[#5a524a]">{row.animal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PdfExportEmbed() {
  return (
    <div className="bg-[#c4704b]/5 rounded-lg border border-[#c4704b]/20 p-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#c4704b]/10 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-[#c4704b]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#c4704b]" />
            <span className="text-xs font-medium text-[#5a524a] truncate">
              บทสรุป-เซลล์พืชและสัตว์.pdf
            </span>
          </div>
          <p className="text-[10px] text-[#8a7e74] mt-0.5">2.4 MB — Export สำเร็จ</p>
        </div>
      </div>
    </div>
  );
}

export function AiEmbedMessage({ embed }: AiEmbedMessageProps) {
  const embedMap: Record<EmbedType, React.ReactNode> = {
    "qr-code": <QrCodeEmbed />,
    "line-link": <LineLinkEmbed />,
    "dashboard-preview": <DashboardPreviewEmbed />,
    "table-preview": <TablePreviewEmbed />,
    "pdf-export": <PdfExportEmbed />,
  };

  return <div className="ml-9">{embedMap[embed.type]}</div>;
}
