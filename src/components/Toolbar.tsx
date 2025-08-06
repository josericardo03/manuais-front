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
  Search,
  Printer,
  CheckCircle,
  Paintbrush,
  ZoomIn,
  ZoomOut,
  Link,
  MessageSquarePlus,
  Image,
  Indent,
  Outdent,
  X,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

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

const paragraphStyles = [
  { name: "Texto normal", value: "paragraph" },
  { name: "Título 1", value: "heading1" },
  { name: "Título 2", value: "heading2" },
  { name: "Título 3", value: "heading3" },
];

const zoomLevels = ["50%", "75%", "90%", "100%", "125%", "150%", "200%"];

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

  const [zoomLevel, setZoomLevel] = useState("100%");
  const [selectedStyle, setSelectedStyle] = useState(paragraphStyles[0]);

  const handleParagraphStyleChange = (style: (typeof paragraphStyles)[0]) => {
    setSelectedStyle(style);
    if (style.value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (style.value.startsWith("heading")) {
      const level = parseInt(style.value.replace("heading", ""));
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const handleZoomChange = (zoom: string) => {
    setZoomLevel(zoom);
    // Aqui você pode implementar a lógica de zoom
  };

  const insertLink = () => {
    const url = prompt("Digite a URL:");
    if (url) {
      // Implementação simples de link - insere como texto com URL
      const linkText = prompt("Digite o texto do link:", url);
      if (linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${url}" target="_blank">${linkText}</a>`)
          .run();
      }
    }
  };

  const insertImage = () => {
    const url = prompt("Digite a URL da imagem:");
    if (url) {
      // Implementação simples de imagem - insere como HTML
      editor
        .chain()
        .focus()
        .insertContent(
          `<img src="${url}" alt="Imagem" style="max-width: 100%; height: auto;" />`
        )
        .run();
    }
  };

  const addComment = () => {
    const comment = prompt("Digite seu comentário:");
    if (comment) {
      // Implementar lógica de comentários
      console.log("Comentário adicionado:", comment);
    }
  };

  const clearFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  const formatPainter = () => {
    // Implementar lógica do pintor de formatação
    console.log("Pintor de formatação ativado");
  };

  const spellCheck = () => {
    // Implementar verificação ortográfica
    console.log("Verificação ortográfica ativada");
  };

  const print = () => {
    window.print();
  };

  const search = () => {
    const query = prompt("Digite o texto para buscar:");
    if (query) {
      // Implementar lógica de busca
      console.log("Buscando:", query);
    }
  };

  return (
    <div className="border-b bg-[#edf2fa] sticky top-0 z-50">
      <div className="flex items-center gap-1 p-1 flex-wrap">
        {/* Busca */}
        <button
          onClick={search}
          className="p-1 rounded hover:bg-gray-200"
          title="Buscar"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Desfazer/Refazer */}
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

        {/* Impressora */}
        <button
          onClick={print}
          className="p-1 rounded hover:bg-gray-200"
          title="Imprimir"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* Verificação ortográfica */}
        <button
          onClick={spellCheck}
          className="p-1 rounded hover:bg-gray-200"
          title="Verificação ortográfica"
        >
          <CheckCircle className="w-4 h-4" />
        </button>

        {/* Pintor de formatação */}
        <button
          onClick={formatPainter}
          className="p-1 rounded hover:bg-gray-200"
          title="Pintor de formatação"
        >
          <Paintbrush className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Zoom */}
        <div className="relative group">
          <select
            value={zoomLevel}
            onChange={(e) => handleZoomChange(e.target.value)}
            className="flex items-center gap-1 p-1 rounded hover:bg-gray-200 bg-transparent pr-8 text-sm"
          >
            {zoomLevels.map((zoom) => (
              <option key={zoom} value={zoom}>
                {zoom}
              </option>
            ))}
          </select>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Estilos de parágrafo */}
        <div className="relative group">
          <select
            value={selectedStyle.value}
            onChange={(e) => {
              const style = paragraphStyles.find(
                (s) => s.value === e.target.value
              );
              if (style) handleParagraphStyleChange(style);
            }}
            className="flex items-center gap-1 p-1 rounded hover:bg-gray-200 bg-transparent pr-8 text-sm"
          >
            {paragraphStyles.map((style) => (
              <option key={style.value} value={style.value}>
                {style.name}
              </option>
            ))}
          </select>
        </div>

        {/* Seletor de fonte */}
        <div className="relative group">
          <select
            value={selectedFont.value}
            onChange={(e) => {
              const font = fonts.find((f) => f.value === e.target.value);
              if (font) onFontChange(font);
            }}
            className="flex items-center gap-1 p-1 rounded hover:bg-gray-200 bg-transparent pr-8 text-sm"
          >
            {fonts.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Controles de tamanho da fonte */}
        <button
          onClick={() => {
            const currentIndex = fontSizes.indexOf(fontSize);
            if (currentIndex > 0) {
              onFontSizeChange(fontSizes[currentIndex - 1]);
            }
          }}
          className="p-1 rounded hover:bg-gray-200"
          title="Diminuir tamanho da fonte"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="relative group">
          <select
            value={fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
            className="flex items-center gap-1 p-1 rounded hover:bg-gray-200 bg-transparent w-12 text-sm text-center"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            const currentIndex = fontSizes.indexOf(fontSize);
            if (currentIndex < fontSizes.length - 1) {
              onFontSizeChange(fontSizes[currentIndex + 1]);
            }
          }}
          className="p-1 rounded hover:bg-gray-200"
          title="Aumentar tamanho da fonte"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Formatação de texto */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Negrito"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Itálico"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 rounded ${
            editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-200"
          }`}
          title="Sublinhado"
        >
          <Underline className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Cores */}
        <div className="relative group">
          <button
            className="p-1 rounded hover:bg-gray-200 flex items-center gap-1"
            title="Cor do texto"
          >
            <Palette className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute hidden group-hover:flex flex-wrap w-32 p-2 bg-white shadow-lg rounded-lg top-full left-0 mt-1 z-50">
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

        <div className="relative group">
          <button
            className="p-1 rounded hover:bg-gray-200 flex items-center gap-1"
            title="Cor de destaque"
          >
            <Highlighter className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute hidden group-hover:flex flex-wrap w-32 p-2 bg-white shadow-lg rounded-lg top-full left-0 mt-1 z-50">
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

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Links e comentários */}
        <button
          onClick={insertLink}
          className="p-1 rounded hover:bg-gray-200"
          title="Inserir link"
        >
          <Link className="w-4 h-4" />
        </button>

        <button
          onClick={addComment}
          className="p-1 rounded hover:bg-gray-200"
          title="Adicionar comentário"
        >
          <MessageSquarePlus className="w-4 h-4" />
        </button>

        <button
          onClick={insertImage}
          className="p-1 rounded hover:bg-gray-200"
          title="Inserir imagem"
        >
          <Image className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alinhamento */}
        <div className="relative group">
          <button
            className="p-1 rounded hover:bg-gray-200 flex items-center gap-1"
            title="Alinhamento"
          >
            <AlignLeft className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg top-full left-0 mt-1 z-50">
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className="p-2 hover:bg-gray-100 flex items-center gap-2"
              title="Alinhar à esquerda"
            >
              <AlignLeft className="w-4 h-4" />
              Esquerda
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className="p-2 hover:bg-gray-100 flex items-center gap-2"
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4" />
              Centro
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className="p-2 hover:bg-gray-100 flex items-center gap-2"
              title="Alinhar à direita"
            >
              <AlignRight className="w-4 h-4" />
              Direita
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className="p-2 hover:bg-gray-100 flex items-center gap-2"
              title="Justificar"
            >
              <AlignJustify className="w-4 h-4" />
              Justificar
            </button>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Espaçamento de linha */}
        <div className="relative group">
          <button
            className="p-1 rounded hover:bg-gray-200"
            title="Espaçamento de linha"
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center">
              <div className="w-3 h-0.5 bg-current"></div>
              <div className="w-3 h-0.5 bg-current mt-0.5"></div>
              <div className="w-3 h-0.5 bg-current mt-0.5"></div>
            </div>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Listas */}
        <div className="relative group">
          <button
            className="p-1 rounded hover:bg-gray-200 flex items-center gap-1"
            title="Listas"
          >
            <List className="w-4 h-4" />
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg top-full left-0 mt-1 z-50">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="p-2 hover:bg-gray-100 flex items-center gap-2"
              title="Lista com marcadores"
            >
              <List className="w-4 h-4" />
              Lista com marcadores
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="p-2 hover:bg-gray-100 flex items-center gap-2"
              title="Lista numerada"
            >
              <ListOrdered className="w-4 h-4" />
              Lista numerada
            </button>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Recuo - implementação simples com CSS */}
        <button
          onClick={() => {
            // Implementação simples de recuo usando CSS
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const container = range.commonAncestorContainer;
              if (container.nodeType === Node.TEXT_NODE) {
                const parent = container.parentElement;
                if (parent) {
                  const currentMargin =
                    parseInt(getComputedStyle(parent).marginLeft) || 0;
                  parent.style.marginLeft = `${Math.max(
                    0,
                    currentMargin - 20
                  )}px`;
                }
              }
            }
          }}
          className="p-1 rounded hover:bg-gray-200"
          title="Diminuir recuo"
        >
          <Outdent className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            // Implementação simples de recuo usando CSS
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const container = range.commonAncestorContainer;
              if (container.nodeType === Node.TEXT_NODE) {
                const parent = container.parentElement;
                if (parent) {
                  const currentMargin =
                    parseInt(getComputedStyle(parent).marginLeft) || 0;
                  parent.style.marginLeft = `${currentMargin + 20}px`;
                }
              }
            }
          }}
          className="p-1 rounded hover:bg-gray-200"
          title="Aumentar recuo"
        >
          <Indent className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Limpar formatação */}
        <button
          onClick={clearFormatting}
          className="p-1 rounded hover:bg-gray-200"
          title="Limpar formatação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
