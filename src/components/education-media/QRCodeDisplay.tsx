"use client";

import { useQRCode } from "next-qrcode";
import { Copy, Share2 } from "lucide-react";

interface QRCodeDisplayProps {
  url: string;
  title: string;
}

export function QRCodeDisplay({ url, title }: QRCodeDisplayProps) {
  const { Canvas } = useQRCode();

  return (
    <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center gap-4 border border-gray-100">
      <h3 className="text-sm font-medium text-gray-700">แชร์ให้นักเรียน</h3>
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <Canvas
          text={url}
          options={{
            errorCorrectionLevel: "M",
            margin: 2,
            scale: 4,
            width: 160,
            color: {
              dark: "#3d3530",
              light: "#ffffff",
            },
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center max-w-[200px]">{title}</p>
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
          <Copy className="w-3 h-3" />
          Copy Link
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#c4704b] text-white hover:bg-[#c4704b]/90 transition-colors">
          <Share2 className="w-3 h-3" />
          Share
        </button>
      </div>
    </div>
  );
}
