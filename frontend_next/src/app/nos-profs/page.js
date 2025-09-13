"use client ";
import Professeurs from "@/features/nos_profs/professeurs";

export default function PageNosProfs() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nos Professeurs</h1>
      <Professeurs />
    </main>
  );
}

