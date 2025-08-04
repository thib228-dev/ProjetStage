"use client";

import { useRouter } from "next/navigation"; 
import NouvelEtudiantStep3 from "@/features/etudiant/inscription/etape-3/NouvelEtudiantStep3";

export default function PageStep3() {
  const router = useRouter();

  // data = { parcours, filiere, annee } envoyé par l'enfant
  const handleSubmit = (data) => {
    console.log("Données reçues :", data);
    // Ici tu peux stocker data si besoin (localStorage, context...)
    router.push("/etudiant/inscription/etape-4");
  };

  return (
    <main className="p-6">
      <NouvelEtudiantStep3 onSubmit={handleSubmit} />
    </main>
  );
}
