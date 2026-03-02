import type {
  ChatMessage,
  EditorBlock,
  SlashCommand,
  Quiz,
  StudentResponse,
  StatsCardData,
} from "@/types";

// ==========================================
// USE CASE 1: Smart Docs
// ==========================================

// Initial messages shown on page load
export const smartDocsInitialMessages: ChatMessage[] = [
  {
    id: "sd-1",
    role: "user",
    content:
      "ช่วยสร้างเอกสารสรุปบทเรียน วิชาวิทยาศาสตร์ ม.1 เรื่องเซลล์พืชและเซลล์สัตว์",
    step: 0,
  },
  {
    id: "sd-2",
    role: "ai",
    content: "กำลังสร้างเอกสารสรุปบทเรียนให้ค่ะ...",
    actions: [{ label: "Wrote docs/บทสรุป-เซลล์พืชและสัตว์", icon: "file" }],
    step: 0,
  },
  {
    id: "sd-3",
    role: "ai",
    content:
      "เอกสารสรุปบทเรียนพร้อมแล้วค่ะ สามารถดูได้ที่แท็บเอกสารทางด้านขวา",
    suggestions: ["เพิ่มรูปภาพประกอบ", "เพิ่มคำถามท้ายบท", "สร้างใบงาน"],
    step: 0,
  },
];

// Suggestion → AI response map (every suggestion has a matching response)
export interface SuggestionResponse {
  aiContent: string;
  actions?: { label: string; icon?: string }[];
  embed?: ChatMessage["embed"];
  suggestions?: string[];
}

export const smartDocsSuggestionMap: Record<string, SuggestionResponse> = {
  "เพิ่มรูปภาพประกอบ": {
    aiContent: "เพิ่มรูปภาพประกอบเรียบร้อยแล้วค่ะ",
    actions: [{ label: "Generated รูปภาพ: โครงสร้างเซลล์พืช", icon: "image" }],
    suggestions: ["เพิ่มรูปเซลล์สัตว์", "สร้างตารางเปรียบเทียบ", "ส่งออก PDF"],
  },
  "เพิ่มคำถามท้ายบท": {
    aiContent: "เพิ่มคำถามท้ายบทเรียบร้อยแล้วค่ะ มีทั้งหมด 5 ข้อ",
    actions: [{ label: "Generated คำถามท้ายบท 5 ข้อ", icon: "file" }],
    suggestions: ["เพิ่มรูปภาพประกอบ", "สร้างตารางเปรียบเทียบ", "ส่งออก PDF"],
  },
  "สร้างใบงาน": {
    aiContent: "สร้างใบงานเรียบร้อยแล้วค่ะ",
    actions: [{ label: "Generated ใบงาน: เซลล์พืชและสัตว์", icon: "file" }],
    suggestions: ["เพิ่มรูปภาพประกอบ", "สร้างตารางเปรียบเทียบ", "ส่งออก PDF"],
  },
  "เพิ่มรูปเซลล์สัตว์": {
    aiContent: "เพิ่มรูปภาพเซลล์สัตว์เรียบร้อยแล้วค่ะ",
    actions: [{ label: "Generated รูปภาพ: โครงสร้างเซลล์สัตว์", icon: "image" }],
    suggestions: ["สร้างตารางเปรียบเทียบ", "ส่งออก PDF", "แชร์เอกสาร"],
  },
  "สร้างตารางเปรียบเทียบ": {
    aiContent: "สร้างตารางเปรียบเทียบเซลล์พืชและเซลล์สัตว์เรียบร้อยแล้วค่ะ",
    actions: [{ label: "Generated ตารางเปรียบเทียบเซลล์", icon: "file" }],
    embed: { type: "table-preview" },
    suggestions: ["ส่งออก PDF", "แชร์เอกสาร"],
  },
  "ส่งออก PDF": {
    aiContent: "ส่งออกเอกสาร PDF เรียบร้อยแล้วค่ะ",
    actions: [{ label: "Exported บทสรุป-เซลล์.pdf", icon: "file" }],
    embed: { type: "pdf-export" },
    suggestions: ["สร้างใบงาน", "แชร์เอกสาร"],
  },
  "แชร์เอกสาร": {
    aiContent: "แชร์เอกสารเรียบร้อยแล้วค่ะ ส่งลิงก์ให้นักเรียนทางอีเมลแล้ว",
    actions: [{ label: "Shared เอกสารสรุปบทเรียน", icon: "file" }],
    suggestions: ["ส่งออก PDF", "สร้างใบงาน"],
  },
};

export const smartDocsBlocks: EditorBlock[] = [
  {
    id: "b1",
    type: "heading",
    content: "สรุปบทเรียน: เซลล์พืชและเซลล์สัตว์",
    level: 1,
    aiGenerated: true,
  },
  {
    id: "b2",
    type: "reference",
    content: "",
    refName: "หลักสูตรวิทยาศาสตร์ ม.1",
  },
  {
    id: "b3",
    type: "paragraph",
    content:
      "วิชาวิทยาศาสตร์ ระดับชั้นมัธยมศึกษาปีที่ 1 หน่วยการเรียนรู้ที่ 2: ชีววิทยาเบื้องต้น",
    aiGenerated: true,
  },
  { id: "b4", type: "separator", content: "" },
  {
    id: "b5",
    type: "heading",
    content: "เซลล์คืออะไร?",
    level: 2,
    aiGenerated: true,
  },
  {
    id: "b6",
    type: "paragraph",
    content:
      "เซลล์ (Cell) คือหน่วยพื้นฐานที่เล็กที่สุดของสิ่งมีชีวิต ทำหน้าที่ต่างๆ เพื่อให้สิ่งมีชีวิตดำรงชีวิตอยู่ได้ เซลล์แบ่งออกเป็น 2 ประเภทหลัก ได้แก่ เซลล์พืช และเซลล์สัตว์",
    aiGenerated: true,
  },
  { id: "b7", type: "separator", content: "" },
  {
    id: "b8",
    type: "heading",
    content: "โครงสร้างของเซลล์พืช",
    level: 2,
    aiGenerated: true,
  },
  {
    id: "b9",
    type: "paragraph",
    content:
      "เซลล์พืชมีองค์ประกอบสำคัญ ได้แก่:\n• ผนังเซลล์ (Cell Wall) — โครงสร้างแข็งที่ล้อมรอบเซลล์ ให้ความแข็งแรง\n• เยื่อหุ้มเซลล์ (Cell Membrane) — ควบคุมการผ่านเข้าออกของสาร\n• นิวเคลียส (Nucleus) — ศูนย์ควบคุมการทำงานของเซลล์\n• คลอโรพลาสต์ (Chloroplast) — ทำหน้าที่สังเคราะห์ด้วยแสง\n• แวคิวโอล (Vacuole) — เก็บสะสมน้ำและสารต่างๆ ขนาดใหญ่",
    aiGenerated: true,
  },
  { id: "b10", type: "separator", content: "" },
  {
    id: "b11",
    type: "heading",
    content: "โครงสร้างของเซลล์สัตว์",
    level: 2,
    aiGenerated: true,
  },
  {
    id: "b12",
    type: "paragraph",
    content:
      "เซลล์สัตว์มีองค์ประกอบสำคัญ ได้แก่:\n• เยื่อหุ้มเซลล์ (Cell Membrane) — ควบคุมการผ่านเข้าออกของสาร\n• นิวเคลียส (Nucleus) — ศูนย์ควบคุมการทำงานของเซลล์\n• ไมโทคอนเดรีย (Mitochondria) — ผลิตพลังงานให้เซลล์\n• ไรโบโซม (Ribosome) — สร้างโปรตีน\n• เซนทริโอล (Centriole) — ช่วยในการแบ่งเซลล์",
    aiGenerated: true,
  },
  { id: "b13", type: "separator", content: "" },
  {
    id: "b14",
    type: "heading",
    content: "ความแตกต่างระหว่างเซลล์พืชและเซลล์สัตว์",
    level: 2,
    aiGenerated: true,
  },
  {
    id: "b15",
    type: "reference",
    content: "",
    refName: "ตารางเปรียบเทียบเซลล์ ม.1",
  },
  {
    id: "b16",
    type: "paragraph",
    content:
      "ข้อแตกต่างที่สำคัญ:\n1. เซลล์พืชมีผนังเซลล์ แต่เซลล์สัตว์ไม่มี\n2. เซลล์พืชมีคลอโรพลาสต์ แต่เซลล์สัตว์ไม่มี\n3. เซลล์พืชมีแวคิวโอลขนาดใหญ่ แต่เซลล์สัตว์มีขนาดเล็กหรือไม่มี\n4. เซลล์สัตว์มีเซนทริโอล แต่เซลล์พืชไม่มี\n5. เซลล์พืชมีรูปร่างค่อนข้างเป็นเหลี่ยม แต่เซลล์สัตว์มีรูปร่างกลมหรือไม่แน่นอน",
    aiGenerated: true,
  },
];

export const smartDocsImageBlock: EditorBlock = {
  id: "b-img",
  type: "image",
  content: "",
  imageLabel: "โครงสร้างเซลล์พืช",
  aiGenerated: true,
};

export const slashCommands: SlashCommand[] = [
  { label: "Text", icon: "type", type: "paragraph" },
  { label: "Heading", icon: "heading", type: "heading" },
  { label: "Image", icon: "image", type: "image" },
  { label: "Gen Picture", icon: "sparkles", type: "image" },
  { label: "Link Reference", icon: "link", type: "reference" },
];

// ==========================================
// USE CASE 2: Education Media
// ==========================================

// Initial messages shown on page load
export const educationMediaInitialMessages: ChatMessage[] = [
  {
    id: "em-1",
    role: "user",
    content:
      "สร้างแบบทดสอบออนไลน์ วิชาคณิตศาสตร์ ม.3 เรื่องสมการเชิงเส้น 10 ข้อ",
    step: 0,
  },
  {
    id: "em-2",
    role: "ai",
    content: "กำลังสร้างแบบทดสอบให้ค่ะ...",
    actions: [
      { label: "Wrote entities/Quiz", icon: "database" },
      { label: "Wrote quiz/Question Display", icon: "file" },
      { label: "Wrote quiz/Answer Options", icon: "file" },
      { label: "Wrote quiz/Score Board", icon: "file" },
      { label: "Wrote Quiz Page", icon: "file" },
    ],
    step: 0,
  },
  {
    id: "em-3",
    role: "ai",
    content:
      "แบบทดสอบออนไลน์พร้อมแล้วค่ะ มีทั้งหมด 10 ข้อ สามารถดูตัวอย่างได้ที่แท็บ Preview ทางด้านขวา",
    suggestions: ["เพิ่มเวลาจำกัด", "เพิ่มคำอธิบายเฉลย", "สร้าง QR Code"],
    step: 0,
  },
];

export const educationMediaSuggestionMap: Record<string, SuggestionResponse> = {
  "เพิ่มเวลาจำกัด": {
    aiContent: "เพิ่มเวลาจำกัด 30 นาทีสำหรับทำแบบทดสอบเรียบร้อยแล้วค่ะ",
    actions: [{ label: "Updated Quiz: เวลาจำกัด 30 นาที", icon: "file" }],
    suggestions: ["สร้าง QR Code", "เพิ่มคำอธิบายเฉลย", "ส่งลิงก์ทาง LINE"],
  },
  "เพิ่มคำอธิบายเฉลย": {
    aiContent: "เพิ่มคำอธิบายเฉลยสำหรับทุกข้อเรียบร้อยแล้วค่ะ",
    actions: [{ label: "Generated คำอธิบายเฉลย 10 ข้อ", icon: "file" }],
    suggestions: ["สร้าง QR Code", "เพิ่มเวลาจำกัด", "ส่งลิงก์ทาง LINE"],
  },
  "สร้าง QR Code": {
    aiContent: "สร้าง QR Code เรียบร้อยแล้วค่ะ นักเรียนสามารถสแกนเพื่อเข้าทำแบบทดสอบได้เลย",
    actions: [{ label: "Generated QR Code: แบบทดสอบสมการเชิงเส้น", icon: "qr-code" }],
    embed: { type: "qr-code" },
    suggestions: ["ตั้งเวลาเปิด-ปิด", "ส่งลิงก์ทาง LINE", "ดู Dashboard"],
  },
  "ตั้งเวลาเปิด-ปิด": {
    aiContent: "ตั้งเวลาเปิด-ปิดแบบทดสอบเรียบร้อยแล้วค่ะ เปิดรับ 09:00 – ปิด 16:00 วันนี้",
    actions: [{ label: "Updated Quiz Schedule", icon: "file" }],
    suggestions: ["ส่งลิงก์ทาง LINE", "ดู Dashboard"],
  },
  "ส่งลิงก์ทาง LINE": {
    aiContent: "ส่งลิงก์แบบทดสอบผ่าน LINE เรียบร้อยแล้วค่ะ",
    actions: [{ label: "Shared via LINE", icon: "file" }],
    embed: { type: "line-link" },
    suggestions: ["ดู Dashboard", "ดูสถิติ"],
  },
  "ดู Dashboard": {
    aiContent: "โหลดข้อมูล Dashboard เรียบร้อยแล้วค่ะ",
    actions: [{ label: "Loaded Dashboard", icon: "database" }],
    embed: { type: "dashboard-preview" },
    suggestions: ["ส่งรายงานทาง Email", "ดูรายละเอียด"],
  },
  "ดูสถิติ": {
    aiContent: "โหลดข้อมูลสถิติเรียบร้อยแล้วค่ะ",
    actions: [{ label: "Loaded Analytics", icon: "database" }],
    embed: { type: "dashboard-preview" },
    suggestions: ["ส่งรายงานทาง Email", "ดู Dashboard"],
  },
  "ส่งรายงานทาง Email": {
    aiContent: "ส่งรายงานผลคะแนนทางอีเมลเรียบร้อยแล้วค่ะ",
    actions: [{ label: "Sent Report via Email", icon: "file" }],
    suggestions: ["ดู Dashboard", "ดูรายละเอียด"],
  },
  "ดูรายละเอียด": {
    aiContent: "แสดงรายละเอียดผลคะแนนรายบุคคลค่ะ",
    actions: [{ label: "Loaded Student Details", icon: "database" }],
    embed: { type: "dashboard-preview" },
    suggestions: ["ส่งรายงานทาง Email", "ดู Dashboard"],
  },
};

export const quizData: Quiz = {
  title: "แบบทดสอบสมการเชิงเส้น",
  subject: "คณิตศาสตร์",
  grade: "ม.3",
  totalQuestions: 10,
  questions: [
    {
      id: 1,
      question: "สมการ 2x + 6 = 14 ค่า x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 2" },
        { label: "ข", text: "x = 4" },
        { label: "ค", text: "x = 6" },
        { label: "ง", text: "x = 8" },
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "ถ้า 3x - 9 = 0 แล้ว x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 1" },
        { label: "ข", text: "x = 2" },
        { label: "ค", text: "x = 3" },
        { label: "ง", text: "x = 4" },
      ],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "สมการ 5x + 3 = 2x + 15 ค่า x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 3" },
        { label: "ข", text: "x = 4" },
        { label: "ค", text: "x = 5" },
        { label: "ง", text: "x = 6" },
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "ข้อใดเป็นสมการเชิงเส้นตัวแปรเดียว?",
      choices: [
        { label: "ก", text: "x² + 2x = 5" },
        { label: "ข", text: "3x + 7 = 22" },
        { label: "ค", text: "xy = 10" },
        { label: "ง", text: "x² = 16" },
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "ถ้า 4(x - 2) = 12 แล้ว x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 3" },
        { label: "ข", text: "x = 4" },
        { label: "ค", text: "x = 5" },
        { label: "ง", text: "x = 6" },
      ],
      correctIndex: 2,
    },
    {
      id: 6,
      question: "สมการ x/3 + 2 = 5 ค่า x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 6" },
        { label: "ข", text: "x = 9" },
        { label: "ค", text: "x = 12" },
        { label: "ง", text: "x = 15" },
      ],
      correctIndex: 1,
    },
    {
      id: 7,
      question: "ถ้า 7x - 3 = 4x + 9 แล้ว x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 2" },
        { label: "ข", text: "x = 3" },
        { label: "ค", text: "x = 4" },
        { label: "ง", text: "x = 5" },
      ],
      correctIndex: 2,
    },
    {
      id: 8,
      question: "สมการ 2(3x + 1) = 20 ค่า x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 2" },
        { label: "ข", text: "x = 3" },
        { label: "ค", text: "x = 4" },
        { label: "ง", text: "x = 5" },
      ],
      correctIndex: 1,
    },
    {
      id: 9,
      question: "ถ้า x + x + x = 27 แล้ว x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 7" },
        { label: "ข", text: "x = 8" },
        { label: "ค", text: "x = 9" },
        { label: "ง", text: "x = 10" },
      ],
      correctIndex: 2,
    },
    {
      id: 10,
      question: "สมการ 6x - 4 = 2x + 8 ค่า x มีค่าเท่ากับเท่าไร?",
      choices: [
        { label: "ก", text: "x = 2" },
        { label: "ข", text: "x = 3" },
        { label: "ค", text: "x = 4" },
        { label: "ง", text: "x = 5" },
      ],
      correctIndex: 1,
    },
  ],
};

export const studentResponses: StudentResponse[] = [
  { id: 1, name: "สมชาย วงศ์สุข", score: 9, total: 10, status: "completed", submittedAt: "10:32" },
  { id: 2, name: "สมหญิง แก้วใส", score: 8, total: 10, status: "completed", submittedAt: "10:35" },
  { id: 3, name: "วิชัย ศรีสมร", score: 10, total: 10, status: "completed", submittedAt: "10:28" },
  { id: 4, name: "พิมพ์ใจ รักดี", score: 7, total: 10, status: "completed", submittedAt: "10:40" },
  { id: 5, name: "ธนพล ภูมิใจ", score: 6, total: 10, status: "completed", submittedAt: "10:45" },
  { id: 6, name: "กมลชนก สุขสันต์", score: 0, total: 10, status: "in_progress" },
  { id: 7, name: "ปรีชา มั่นคง", score: 0, total: 10, status: "not_started" },
  { id: 8, name: "นภาพร ดวงแก้ว", score: 0, total: 10, status: "not_started" },
];

export const dashboardStats: StatsCardData[] = [
  { label: "นักเรียนทั้งหมด", value: 8, icon: "users", change: "+3 วันนี้" },
  { label: "คะแนนเฉลี่ย", value: "8.0/10", icon: "bar-chart", change: "80%" },
  { label: "ทำเสร็จแล้ว", value: "5/8", icon: "check-circle", change: "62.5%" },
  { label: "กำลังทำ", value: 1, icon: "clock", change: "12.5%" },
];

export const dashboardSidebarItems = [
  { label: "Overview", icon: "layout-dashboard", active: true },
  { label: "Students", icon: "users" },
  { label: "Data", icon: "database" },
  { label: "Analytics", icon: "bar-chart-3" },
  { label: "Settings", icon: "settings" },
];
