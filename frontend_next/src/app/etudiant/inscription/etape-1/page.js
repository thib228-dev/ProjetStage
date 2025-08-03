"use client";

import { useRouter } from "next/navigation"; 
import React from "react";
import NouvelEtudiantStep1 from "@/features/etudiant/inscription/etape-1/NouvelEtudiantStep1";
export default function PageStep1() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    router.push("/etudiant/inscription/etape-2"); 
      
  }
  return (
      <main className="p-6">
        <NouvelEtudiantStep1 onSubmit={handleSubmit} />
      </main>
    );

}
