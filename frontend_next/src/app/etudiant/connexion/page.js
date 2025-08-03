"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Formulaire from "@/components/ui/Formulaire.js";
import Link from "next/link";

export default function ConnexionEtudiant() {
  const router = useRouter();

  const champs = [
    {
      nom: "identifiant",
      label: "Matricule ou Email",
      placeholder: "Entrez votre matricule ou email",
      requis: true,
    },
    {
      nom: "motdepasse",
      label: "Mot de passe",
      type: "password",
      placeholder: "Votre mot de passe",
      requis: true,
    },
  ];

  function handleFormSubmit(valeurs) {
    console.log("Formulaire validé ", valeurs);
    router.push("/etudiant/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Connexion Étudiant</h1>

        <Formulaire champs={champs} onSubmit={handleFormSubmit} />

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/" className="text-blue-700 hover:underline">Retour à l'accueil</Link>
          <Link href="/etudiant/inscription" className="text-blue-700 hover:underline">Nouveau ? Inscrivez-vous</Link>
        </div>
      </div>
    </div>
  );
}
