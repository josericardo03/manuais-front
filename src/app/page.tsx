"use client";

import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("../components/TiptapEditor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <TiptapEditor />
    </main>
  );
}
