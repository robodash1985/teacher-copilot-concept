import {
  createReactInlineContentSpec,
  createReactBlockSpec,
} from "@blocknote/react";
import { defaultInlineContentSpecs, defaultBlockSpecs } from "@blocknote/core";
import { BlockNoteSchema } from "@blocknote/core";
import { BookOpen, BrainCircuit, ChevronDown, Hash, Paperclip, Sparkles, Wand2 } from "lucide-react";
import { createElement } from "react";

// Inline content: document reference badge
const DocumentRef = createReactInlineContentSpec(
  {
    type: "documentRef" as const,
    propSchema: {
      name: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      return createElement(
        "span",
        {
          className:
            "inline-flex items-center gap-1.5 px-3 py-1 bg-[#c4704b]/10 text-[#c4704b] rounded-md text-xs font-medium border border-[#c4704b]/20 cursor-pointer hover:bg-[#c4704b]/15 transition-colors",
        },
        createElement(Paperclip, { className: "w-3 h-3" }),
        props.inlineContent.props.name
      );
    },
  }
);

// Block: generated image placeholder (createReactBlockSpec returns a factory)
const GeneratedImage = createReactBlockSpec(
  {
    type: "generatedImage" as const,
    propSchema: {
      label: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      return createElement(
        "div",
        {
          className: "border-l-2 border-[#c4704b]/40 pl-4 my-2",
        },
        createElement(
          "div",
          {
            className:
              "relative w-full h-48 rounded-xl bg-gradient-to-br from-[#c4704b]/10 via-[#d4956a]/10 to-[#e8ddd3]/30 border border-[#c4704b]/20 flex flex-col items-center justify-center gap-3 overflow-hidden",
          },
          createElement("div", {
            className:
              "absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_40%,#c4704b_0%,transparent_60%),radial-gradient(circle_at_70%_60%,#d4956a_0%,transparent_60%)]",
          }),
          createElement(
            "div",
            {
              className:
                "w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center",
            },
            createElement(Sparkles, { className: "w-5 h-5 text-[#c4704b]" })
          ),
          createElement(
            "span",
            { className: "text-sm font-medium text-[#c4704b]" },
            props.block.props.label
          ),
          createElement(
            "span",
            { className: "text-xs text-[#d4956a]" },
            "AI Generated Image"
          )
        )
      );
    },
  }
)();

// Mock lesson data for Smart Lesson
const MOCK_CHAPTERS = [
  { id: "ch1", label: "บทเรียนที่ 1: นำเข้าสู่บทเรียน" },
  { id: "ch2", label: "บทเรียนที่ 2: เนื้อหาหลัก" },
  { id: "ch3", label: "บทเรียนที่ 3: กิจกรรมการเรียนรู้" },
  { id: "ch4", label: "บทเรียนที่ 4: สรุปและทบทวน" },
  { id: "ch5", label: "บทเรียนที่ 5: วัดผลและประเมินผล" },
];

// Mock AI generated lesson blocks per chapter — structured like real AI output
const MOCK_AI_BLOCKS: Record<string, any[]> = {
  ch1: [
    { type: "heading", props: { level: 2 }, content: "จุดประสงค์การเรียนรู้" },
    { type: "bulletListItem", content: "นักเรียนสามารถอธิบายความหมายและความสำคัญของหัวข้อที่เรียนได้" },
    { type: "bulletListItem", content: "นักเรียนสามารถเชื่อมโยงความรู้เดิมกับเนื้อหาใหม่ได้" },
    { type: "bulletListItem", content: "นักเรียนสามารถตั้งคำถามเกี่ยวกับหัวข้อที่สนใจได้" },
    { type: "heading", props: { level: 3 }, content: "กิจกรรมนำเข้าสู่บทเรียน" },
    { type: "paragraph", content: "เริ่มต้นด้วยการตั้งคำถามกระตุ้นความคิด เพื่อให้นักเรียนทบทวนความรู้เดิมและเชื่อมโยงกับหัวข้อใหม่ที่จะเรียน จากนั้นให้นักเรียนร่วมกันอภิปรายเป็นกลุ่มย่อย แลกเปลี่ยนความคิดเห็นและประสบการณ์ที่เกี่ยวข้อง" },
    { type: "paragraph", content: "ครูสรุปประเด็นสำคัญจากการอภิปรายของนักเรียน พร้อมแนะนำภาพรวมของเนื้อหาที่จะเรียนในบทนี้ เพื่อสร้างแรงจูงใจและความพร้อมในการเรียนรู้" },
    { type: "generatedImage", props: { label: "แผนผังความคิด: เชื่อมโยงความรู้เดิมสู่บทเรียนใหม่" } },
  ],
  ch2: [
    { type: "heading", props: { level: 2 }, content: "เนื้อหาสาระสำคัญ" },
    { type: "paragraph", content: "เนื้อหาหลักของบทเรียนครอบคลุมแนวคิดสำคัญ ทฤษฎี และหลักการพื้นฐานที่นักเรียนจำเป็นต้องเข้าใจ โดยนำเสนอผ่านตัวอย่างที่ใกล้ตัวเพื่อให้ผู้เรียนสามารถเชื่อมโยงกับชีวิตจริงได้" },
    { type: "heading", props: { level: 3 }, content: "แนวคิดหลัก" },
    { type: "numberedListItem", content: "ทฤษฎีพื้นฐาน — ความเข้าใจเชิงลึกเกี่ยวกับหลักการที่เป็นรากฐานของบทเรียน" },
    { type: "numberedListItem", content: "การประยุกต์ใช้ — ตัวอย่างการนำทฤษฎีไปใช้ในสถานการณ์ต่างๆ" },
    { type: "numberedListItem", content: "ความเชื่อมโยง — การเชื่อมโยงกับศาสตร์อื่นและชีวิตประจำวัน" },
    { type: "paragraph", content: "ครูอธิบายเนื้อหาพร้อมยกตัวอย่างประกอบที่ชัดเจน โดยใช้สื่อการเรียนรู้หลากหลายรูปแบบ ทั้งภาพ วิดีโอ และแบบจำลอง เพื่อให้นักเรียนเข้าใจอย่างลึกซึ้ง" },
    { type: "generatedImage", props: { label: "อินโฟกราฟิก: สรุปแนวคิดหลักของบทเรียน" } },
  ],
  ch3: [
    { type: "heading", props: { level: 2 }, content: "กิจกรรมการเรียนรู้เชิงรุก" },
    { type: "paragraph", content: "กิจกรรมออกแบบตามแนวทาง Active Learning เพื่อให้นักเรียนได้ลงมือปฏิบัติจริง ส่งเสริมทักษะการคิดวิเคราะห์และการทำงานร่วมกัน" },
    { type: "heading", props: { level: 3 }, content: "สถานีการเรียนรู้" },
    { type: "bulletListItem", content: "สถานี 1: สำรวจและสังเกต — นักเรียนสังเกตตัวอย่างจริงและบันทึกข้อมูล" },
    { type: "bulletListItem", content: "สถานี 2: ทดลองปฏิบัติ — นักเรียนลงมือทดลองตามขั้นตอนที่กำหนด" },
    { type: "bulletListItem", content: "สถานี 3: วิเคราะห์และสรุป — นักเรียนวิเคราะห์ผลการทดลองและสรุปองค์ความรู้" },
    { type: "bulletListItem", content: "สถานี 4: นำเสนอผลงาน — นักเรียนนำเสนอผลงานกลุ่มต่อชั้นเรียน" },
    { type: "paragraph", content: "ครูเดินสังเกตและให้คำแนะนำระหว่างกิจกรรม พร้อมใช้คำถามปลายเปิดกระตุ้นการคิดของนักเรียนในแต่ละสถานี ใช้เวลาสถานีละ 10–15 นาที" },
    { type: "generatedImage", props: { label: "แผนผังสถานีการเรียนรู้ 4 สถานี" } },
  ],
  ch4: [
    { type: "heading", props: { level: 2 }, content: "สรุปบทเรียนและทบทวน" },
    { type: "paragraph", content: "ครูนำนักเรียนทบทวนเนื้อหาสำคัญที่ได้เรียนรู้ตลอดบทเรียน ผ่านเทคนิคการถาม-ตอบ และการเขียนสรุปด้วยตนเอง" },
    { type: "heading", props: { level: 3 }, content: "ประเด็นสำคัญที่ต้องจดจำ" },
    { type: "numberedListItem", content: "หลักการพื้นฐาน — สรุปแนวคิดหลักที่เป็นแก่นของบทเรียน" },
    { type: "numberedListItem", content: "ขั้นตอนสำคัญ — ลำดับขั้นตอนที่ต้องเข้าใจและปฏิบัติได้" },
    { type: "numberedListItem", content: "ข้อควรระวัง — ข้อผิดพลาดที่พบบ่อยและวิธีหลีกเลี่ยง" },
    { type: "heading", props: { level: 3 }, content: "คำถามทบทวน" },
    { type: "bulletListItem", content: "สิ่งที่ได้เรียนรู้ในวันนี้มีอะไรบ้างที่เชื่อมโยงกับชีวิตประจำวัน?" },
    { type: "bulletListItem", content: "ถ้าต้องอธิบายเนื้อหาวันนี้ให้เพื่อนฟัง จะอธิบายอย่างไร?" },
    { type: "bulletListItem", content: "มีส่วนไหนที่ยังไม่เข้าใจและอยากเรียนรู้เพิ่มเติม?" },
  ],
  ch5: [
    { type: "heading", props: { level: 2 }, content: "การวัดผลและประเมินผล" },
    { type: "paragraph", content: "การประเมินใช้เครื่องมือหลากหลายเพื่อวัดทั้งความรู้ ทักษะ และเจตคติของนักเรียนอย่างรอบด้าน สอดคล้องกับจุดประสงค์การเรียนรู้ที่กำหนดไว้" },
    { type: "heading", props: { level: 3 }, content: "เกณฑ์การประเมิน" },
    { type: "numberedListItem", content: "แบบทดสอบความรู้ (30%) — ข้อสอบปรนัยและอัตนัยครอบคลุมเนื้อหาสำคัญ" },
    { type: "numberedListItem", content: "การสังเกตพฤติกรรม (20%) — การมีส่วนร่วม ความกระตือรือร้น การทำงานกลุ่ม" },
    { type: "numberedListItem", content: "ชิ้นงาน/โครงงาน (30%) — คุณภาพของผลงานตามเกณฑ์รูบริค" },
    { type: "numberedListItem", content: "การประเมินตนเอง (20%) — นักเรียนประเมินการเรียนรู้ของตนเอง" },
    { type: "paragraph", content: "ครูใช้ผลการประเมินเพื่อปรับปรุงการจัดการเรียนรู้ในครั้งต่อไป และให้ feedback รายบุคคลเพื่อส่งเสริมการพัฒนาของนักเรียนอย่างต่อเนื่อง" },
    { type: "generatedImage", props: { label: "ตารางเกณฑ์การประเมินผล (Rubric)" } },
  ],
};
const MOCK_AI_DEFAULT_BLOCKS: any[] = [
  { type: "heading", props: { level: 2 }, content: "เนื้อหาบทเรียน" },
  { type: "paragraph", content: "กรุณาเลือกบทเรียนที่ต้องการเชื่อมโยงก่อน แล้วกดปุ่มสร้างเนื้อหาอีกครั้ง เพื่อให้ AI สร้างเนื้อหาที่ตรงกับบริบทของบทเรียน" },
];

// Block: Smart Lesson — free text with character count goal and lesson linking
const SceneBeat = createReactBlockSpec(
  {
    type: "sceneBeat" as const,
    propSchema: {
      text: { default: "" },
      targetCharCount: { default: "500" },
      chapterId: { default: "" },
      chapterLabel: { default: "" },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { block, editor } = props;
      const { text, targetCharCount, chapterId } = block.props;
      const target = parseInt(targetCharCount, 10) || 500;
      const current = text.length;
      const pct = Math.min((current / target) * 100, 100);
      const isComplete = current >= target;

      const update = (patch: Record<string, string>) => {
        editor.updateBlock(block, { props: patch } as any);
      };

      const handleGenerate = () => {
        const blocks = chapterId
          ? MOCK_AI_BLOCKS[chapterId] ?? MOCK_AI_DEFAULT_BLOCKS
          : MOCK_AI_DEFAULT_BLOCKS;
        editor.insertBlocks(blocks, block, "after");
      };

      // Root card
      return createElement(
        "div",
        {
          className:
            "rounded-xl border border-[#c4704b]/25 bg-white shadow-sm my-2 overflow-hidden",
          style: { width: "100%" },
        },
        // ── Header bar ──
        createElement(
          "div",
          {
            className:
              "flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#c4704b]/10 to-[#d4956a]/10 border-b border-[#c4704b]/15",
          },
          createElement(BrainCircuit, { className: "w-4 h-4 text-[#c4704b]" }),
          createElement(
            "span",
            {
              className:
                "text-xs font-semibold tracking-wide text-[#c4704b] uppercase",
            },
            "Smart Lesson"
          )
        ),

        // ── Body ──
        createElement(
          "div",
          { className: "p-4 space-y-4" },

          // Textarea wrapper — contentEditable false prevents ProseMirror capture
          createElement(
            "div",
            { contentEditable: false },
            createElement("textarea", {
              className:
                "w-full min-h-[120px] p-3 rounded-lg border border-[#e8ddd3] bg-[#faf7f4] text-sm text-gray-800 placeholder:text-[#d4956a]/60 resize-y focus:outline-none focus:ring-2 focus:ring-[#c4704b]/30 focus:border-[#c4704b]/40 transition-colors",
              placeholder: "เขียนเนื้อหาบทเรียนที่นี่...",
              value: text,
              onChange: (e: any) => update({ text: e.target.value }),
            })
          ),

          // ── Character count section ──
          createElement(
            "div",
            { className: "space-y-2" },
            // Label + count
            createElement(
              "div",
              { className: "flex items-center justify-between" },
              createElement(
                "div",
                { className: "flex items-center gap-1.5 text-xs text-gray-500" },
                createElement(Hash, { className: "w-3.5 h-3.5" }),
                "จำนวนตัวอักษร"
              ),
              createElement(
                "span",
                {
                  className: `text-xs font-medium ${
                    isComplete ? "text-green-600" : "text-gray-600"
                  }`,
                },
                `${current} / ${target}`
              )
            ),
            // Progress bar
            createElement(
              "div",
              {
                className:
                  "w-full h-2 rounded-full bg-[#e8ddd3]/60 overflow-hidden",
              },
              createElement("div", {
                className: `h-full rounded-full transition-all duration-300 ${
                  isComplete ? "bg-[#4ade80]" : "bg-[#c4704b]"
                }`,
                style: { width: `${pct}%` },
              })
            ),
            // Target input
            createElement(
              "div",
              {
                className: "flex items-center gap-2 text-xs text-gray-500",
                contentEditable: false,
              },
              "เป้าหมาย:",
              createElement("input", {
                type: "number",
                min: "1",
                className:
                  "w-20 px-2 py-1 rounded border border-[#e8ddd3] bg-white text-center text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#c4704b]/30",
                value: targetCharCount,
                onChange: (e: any) =>
                  update({ targetCharCount: e.target.value }),
              }),
              "ตัวอักษร"
            )
          ),

          // ── Chapter selector ──
          createElement(
            "div",
            { className: "space-y-1.5", contentEditable: false },
            createElement(
              "div",
              { className: "flex items-center gap-1.5 text-xs text-gray-500" },
              createElement(BookOpen, { className: "w-3.5 h-3.5" }),
              "เชื่อมโยงบทเรียน (Lesson Context)"
            ),
            createElement(
              "div",
              { className: "relative" },
              createElement(
                "select",
                {
                  className:
                    "w-full appearance-none px-3 py-2 pr-8 rounded-lg border border-[#e8ddd3] bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#c4704b]/30 focus:border-[#c4704b]/40 transition-colors cursor-pointer",
                  value: chapterId,
                  onChange: (e: any) => {
                    const sel = MOCK_CHAPTERS.find(
                      (c) => c.id === e.target.value
                    );
                    update({
                      chapterId: e.target.value,
                      chapterLabel: sel?.label ?? "",
                    });
                  },
                },
                createElement(
                  "option",
                  { value: "" },
                  "-- เลือกบทเรียน --"
                ),
                ...MOCK_CHAPTERS.map((ch) =>
                  createElement(
                    "option",
                    { key: ch.id, value: ch.id },
                    ch.label
                  )
                )
              ),
              createElement(ChevronDown, {
                className:
                  "absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none",
              })
            )
          ),

          // ── AI Generate button ──
          createElement(
            "div",
            {
              className: "pt-2 border-t border-[#e8ddd3]",
              contentEditable: false,
            },
            createElement(
              "button",
              {
                className:
                  "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#c4704b] to-[#d4956a] text-white text-sm font-medium hover:from-[#b36342] hover:to-[#c4854f] active:scale-[0.98] transition-all shadow-sm cursor-pointer",
                onMouseDown: (e: any) => e.stopPropagation(),
                onClick: (e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleGenerate();
                },
              },
              createElement(Wand2, { className: "w-4 h-4" }),
              "สร้างเนื้อหาด้วย AI"
            )
          )
        )
      );
    },
  }
)();

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    generatedImage: GeneratedImage,
    sceneBeat: SceneBeat,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    documentRef: DocumentRef,
  },
});

export type AppSchema = typeof schema;
