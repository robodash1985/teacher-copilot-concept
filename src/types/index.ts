// Chat types
export type MessageRole = "user" | "ai";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content?: string;
  actions?: AiAction[];
  embed?: {
    type: "qr-code" | "line-link" | "dashboard-preview" | "table-preview" | "pdf-export";
  };
  suggestions?: string[];
  step: number;
}

export interface AiAction {
  label: string;
  icon?: string;
}

// Document editor types
export type BlockType = "heading" | "paragraph" | "reference" | "image" | "separator";

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string;
  level?: 1 | 2 | 3; // for headings
  refName?: string; // for reference blocks
  imageLabel?: string; // for image blocks
  aiGenerated?: boolean;
}

export interface SlashCommand {
  label: string;
  icon: string;
  type: BlockType;
}

// Quiz types
export interface QuizQuestion {
  id: number;
  question: string;
  choices: { label: string; text: string }[];
  correctIndex: number;
}

export interface Quiz {
  title: string;
  subject: string;
  grade: string;
  totalQuestions: number;
  questions: QuizQuestion[];
}

// Dashboard types
export interface StudentResponse {
  id: number;
  name: string;
  score: number;
  total: number;
  status: "completed" | "in_progress" | "not_started";
  submittedAt?: string;
}

export interface StatsCardData {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
}

// Canvas tab types
export interface CanvasTab {
  id: string;
  label: string;
  active?: boolean;
}
