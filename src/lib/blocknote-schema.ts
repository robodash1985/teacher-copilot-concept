import {
  createReactInlineContentSpec,
  createReactBlockSpec,
} from "@blocknote/react";
import { defaultInlineContentSpecs, defaultBlockSpecs } from "@blocknote/core";
import { BlockNoteSchema } from "@blocknote/core";
import { Paperclip, Sparkles } from "lucide-react";
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

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    generatedImage: GeneratedImage,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    documentRef: DocumentRef,
  },
});

export type AppSchema = typeof schema;
