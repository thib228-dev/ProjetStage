"use client";
import { useRouter } from "next/navigation"; 
import React from "react";
import NouvelEtudiantStep3 from "@/features/etudiant/inscription/etape-3/NouvelEtudiantStep3";

export default function PageStep3() {
  const router = useRouter();
  
    const handleSubmit = (e) => {
      e.preventDefault(); 
      router.push("/etudiant/inscription/etape-4"); 
        
    }
  return (
    <main className="p-6">
      <NouvelEtudiantStep3 onSubmit={handleSubmit} />
    </main>
  );
}
