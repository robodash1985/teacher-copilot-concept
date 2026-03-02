"use client";

import { useState } from "react";
import type { Quiz } from "@/types";
import { QuizQuestion } from "./QuizQuestion";
import { QRCodeDisplay } from "./QRCodeDisplay";

interface QuizPreviewProps {
  quiz: Quiz;
  showQR?: boolean;
}

export function QuizPreview({ quiz, showQR }: QuizPreviewProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.totalQuestions) * 100;

  return (
    <div className="max-w-xl mx-auto py-8 px-6 space-y-6">
      {/* Quiz header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {quiz.subject} {quiz.grade} — ข้อ {currentQ + 1}/{quiz.totalQuestions}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#c4704b] to-[#d4956a] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <QuizQuestion
        question={question}
        selectedIndex={answers[currentQ] ?? null}
        onSelect={(idx) => setAnswers({ ...answers, [currentQ]: idx })}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← ข้อก่อนหน้า
        </button>
        {currentQ < quiz.totalQuestions - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#c4704b] to-[#d4956a] text-white hover:opacity-90 transition-opacity"
          >
            ข้อถัดไป →
          </button>
        ) : (
          <button className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity">
            ส่งคำตอบ
          </button>
        )}
      </div>

      {/* QR Code section */}
      {showQR && (
        <div className="pt-4 border-t border-gray-100">
          <QRCodeDisplay
            url="https://teacher-copilot.app/quiz/math-linear-eq"
            title={quiz.title}
          />
        </div>
      )}
    </div>
  );
}
