"use client";

import {
  FileText,
  Image,
  Database,
  QrCode,
  File,
} from "lucide-react";

interface AiActionMessageProps {
  label: string;
  icon?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  file: <FileText className="w-3.5 h-3.5" />,
  image: <Image className="w-3.5 h-3.5" />,
  database: <Database className="w-3.5 h-3.5" />,
  "qr-code": <QrCode className="w-3.5 h-3.5" />,
};

export function AiActionMessage({ label, icon }: AiActionMessageProps) {
  return (
    <div className="ml-9 flex items-center gap-2 bg-chat-action rounded-lg px-3 py-2 text-xs text-[#8a7e74] border border-[#e8ddd3]">
      <span className="text-[#c4704b]">{icon ? iconMap[icon] || <File className="w-3.5 h-3.5" /> : <File className="w-3.5 h-3.5" />}</span>
      <span className="font-mono">{label}</span>
    </div>
  );
}
