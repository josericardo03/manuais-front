"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Minus,
  Undo,
  Redo,
  Type,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
} from "lucide-react";

interface Font {
  name: string;
  value: string;
}

interface Color {
  name: string;
  value: string;
}

interface ToolbarProps {
  editor: Editor | null;
  fonts: Font[];
  selectedFont: Font;
  onFontChange: (font: Font) => void;
  fontSize: string;
  onFontSizeChange: (size: string) => void;
  colors: Color[];
}

const fontSizes = [
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "18",
  "24",
  "30",
  "36",
  "48",
  "60",
  "72",
];

const Toolbar = ({
  editor,
  fonts,
  selectedFont,
  onFontChange,
  fontSize,
  onFontSizeChange,
  colors,
}: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b bg-[#edf2fa] sticky top-0 z-50">
      <div className="flex items-center gap-2 p-1 border-b">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1 rounded hover:bg-gray-200"
          title="Desfazer"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1 rounded hover:bg-gray-200"
          title="Refazer"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Seletor de fonte */}
        <div className="relative group">
          <select
            value={selectedFont.value}
            onChange={(e) => {
              const font = fonts.find((f) => f.value === e.target.value);
              if (font) onFontChange(font);
            }}
            className="flex items-center gap-1 p-1 rounded hover:bg-gray-200 bg-transparent pr-8"
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Seletor de tamanho da fonte */}
        <div className="relative group">
          <select
            value={fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
            className="flex items-center gap-1 p-1 rounded hover:bg-gray-200 bg-transparent w-16"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 p-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Negrito"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Itálico"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Sublinhado"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${
            editor.isActive("strike") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Tachado"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        {/* Seletor de cor do texto */}
        <div className="relative group">
          <button
            className="p-2 rounded hover:bg-gray-200 flex items-center gap-1"
            title="Cor do texto"
          >
            <Palette className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute hidden group-hover:flex flex-wrap w-32 p-2 bg-white shadow-lg rounded-lg top-full left-0 mt-1">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() =>
                  editor.chain().focus().setColor(color.value).run()
                }
                className="w-6 h-6 rounded m-1"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Seletor de cor de destaque */}
        <div className="relative group">
          <button
            className="p-2 rounded hover:bg-gray-200 flex items-center gap-1"
            title="Cor de destaque"
          >
            <Highlighter className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute hidden group-hover:flex flex-wrap w-32 p-2 bg-white shadow-lg rounded-lg top-full left-0 mt-1">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: color.value })
                    .run()
                }
                className="w-6 h-6 rounded m-1"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Alinhar à esquerda"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Centralizar"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Alinhar à direita"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Justificar"
        >
          <AlignJustify className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Lista com marcadores"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Lista numerada"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Título 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200"
              : "hover:bg-gray-200"
          }`}
          title="Título 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
