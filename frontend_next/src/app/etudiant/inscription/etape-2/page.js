"use client";
import { useRouter } from "next/navigation"; 
import React from "react";
import NouvelEtudiantStep2 from "@/features/etudiant/inscription/etape-2/NouvelEtudiantStep2";

export default function PageStep2() {
const router = useRouter();
  return (
    <NouvelEtudiantStep2 onNext={() => router.push("/etudiant/inscription/etape-3")} />
  );
  }