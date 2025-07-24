"use client";
import { useRouter } from "next/navigation"; 
import React from "react";
import NouvelEtudiantStep2 from "@/features/etudiant/inscription/etape-2/NouvelEtudiantStep2";

export default function PageStep2() {
const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push("/etudiant/inscription/etape-3"); 
      
  }
  return (
    <main className="p-6">
      <NouvelEtudiantStep2 onSubmit={handleSubmit} />
    </main>
  );
}
