"use client";

import { useState } from "react";
import { Upload, FileText, X, Loader2, Paperclip } from "lucide-react";

interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onFileSelect: (fileName: string) => void;
}

const recentFiles = [
  { name: "หลักสูตรวิทยาศาสตร์ ม.1.pdf", size: "2.4 MB" },
  { name: "แผนการสอน-เซลล์พืช.docx", size: "1.1 MB" },
  { name: "ใบงาน-ชีววิทยา.pdf", size: "890 KB" },
];

export function FileUploadDialog({ open, onClose, onFileSelect }: FileUploadDialogProps) {
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!open) return null;

  const handleSelect = (fileName: string) => {
    setSelectedFile(fileName);
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setSelectedFile(null);
      onFileSelect(fileName);
      onClose();
    }, 1500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-[#e8ddd3] w-full max-w-md animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8ddd3]">
            <h3 className="text-sm font-semibold text-[#3d3530]">Upload Document</h3>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#f5f0eb] transition-colors"
            >
              <X className="w-4 h-4 text-[#8a7e74]" />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {/* Drop zone */}
            <div className="border-2 border-dashed border-[#e8ddd3] rounded-xl p-8 flex flex-col items-center gap-3 hover:border-[#c4704b]/40 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#f5f0eb] flex items-center justify-center">
                <Upload className="w-5 h-5 text-[#c4704b]" />
              </div>
              <div className="text-center">
                <p className="text-sm text-[#3d3530] font-medium">Drop files here or click to browse</p>
                <p className="text-xs text-[#8a7e74] mt-1">PDF, DOCX, TXT up to 10MB</p>
              </div>
            </div>

            {/* Recent files */}
            <div>
              <p className="text-xs text-[#8a7e74] font-medium mb-2">Recent Files</p>
              <div className="space-y-1">
                {recentFiles.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => handleSelect(file.name)}
                    disabled={isExtracting}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f5f0eb] transition-colors text-left disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4 text-[#c4704b] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#3d3530] truncate">{file.name}</p>
                      <p className="text-xs text-[#8a7e74]">{file.size}</p>
                    </div>
                    {isExtracting && selectedFile === file.name && (
                      <Loader2 className="w-4 h-4 text-[#c4704b] animate-spin shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Extracting status */}
            {isExtracting && (
              <div className="flex items-center gap-2 px-3 py-2 bg-[#f5f0eb] rounded-lg">
                <Loader2 className="w-4 h-4 text-[#c4704b] animate-spin" />
                <span className="text-xs text-[#c4704b] font-medium">Extracting content...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
