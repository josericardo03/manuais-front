"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Collaboration from "@tiptap/extension-collaboration";
import FontSize from "@tiptap/extension-font-size";
// Removendo extensões problemáticas - implementaremos funcionalidades de forma mais simples
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";

// Array de fontes disponíveis
const fonts = [
  { name: "Arial", value: "Arial" },
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Courier New", value: "Courier New" },
  { name: "Georgia", value: "Georgia" },
  { name: "Verdana", value: "Verdana" },
];

// Array de cores para texto e destaque
const colors = [
  { name: "Preto", value: "#000000" },
  { name: "Cinza", value: "#666666" },
  { name: "Vermelho", value: "#FF0000" },
  { name: "Azul", value: "#0000FF" },
  { name: "Verde", value: "#00FF00" },
  { name: "Amarelo", value: "#FFFF00" },
];

const TiptapEditor = () => {
  const [status, setStatus] = useState("connecting");
  const [username] = useState(`Usuário ${Math.floor(Math.random() * 100)}`);
  const [documentName, setDocumentName] = useState("Documento sem título");
  const [fontSize, setFontSize] = useState("11");
  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  // Inicialização do Y.js
  const [ydoc] = useState(() => new Y.Doc());
  const [provider] = useState(
    () => new WebsocketProvider("ws://localhost:1234", "example-document", ydoc)
  );

  useEffect(() => {
    provider.on("status", ({ status }: { status: string }) => {
      setStatus(status);
    });

    return () => {
      provider.destroy();
    };
  }, [provider]);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      TextStyle,
      Bold,
      Italic,
      Strike,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading,
      Color,
      Highlight,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Collaboration.configure({
        document: ydoc,
        field: "document",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] px-4",
      },
    },
  });

  // Função para atualizar o tamanho da fonte
  const updateFontSize = (size: string) => {
    setFontSize(size);
    editor?.chain().focus().setFontSize(`${size}pt`).run();
  };

  // Função para atualizar a fonte
  const updateFont = (font: (typeof fonts)[0]) => {
    setSelectedFont(font);
    editor?.chain().focus().setFontFamily(font.value).run();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header principal estilo Google Docs */}
      <div className="bg-white border-b">
        <div className="max-w-[850px] mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-blue-600">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                  />
                </svg>
              </div>
              <div>
                <input
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="font-medium text-lg bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <div className="flex gap-4 text-sm mt-1">
                  <button className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                    Arquivo
                  </button>
                  <button className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                    Editar
                  </button>
                  <button className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                    Ver
                  </button>
                  <button className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                    Inserir
                  </button>
                  <button className="text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">
                    Formatar
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">{status}</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600">
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor principal */}
      <div className="max-w-[850px] mx-auto">
        <div className="bg-white shadow-lg rounded-lg my-4">
          <Toolbar
            editor={editor}
            fonts={fonts}
            selectedFont={selectedFont}
            onFontChange={updateFont}
            fontSize={fontSize}
            onFontSizeChange={updateFontSize}
            colors={colors}
          />
          <div className="p-4 min-h-[calc(100vh-250px)]">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;
