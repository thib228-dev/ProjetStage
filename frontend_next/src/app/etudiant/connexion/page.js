"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Formulaire from "@/components/ui/Formulaire.js";
import Link from "next/link";
import { login } from "@/services/loginService";

export default function ConnexionEtudiant() {
  const router = useRouter();

  const champs = [
    {
      nom: "identifiant",
      label: "Matricule ou Email",
      placeholder: "email",
      requis: true,
    },
    {
      nom: "motdepasse",
      label: "Mot de passe",
      type: "password",
      placeholder: "password",
      requis: true,
    },
  ];

  async function handleFormSubmit(valeurs) {
    try {
      const data = await login(valeurs.identifiant, valeurs.motdepasse);

      if (!data.success) {
        alert(data.message || "Identifiants incorrects");
        return;
      }

      // Sauvegarde du token
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", valeurs.identifiant);
      localStorage.setItem("mot_de_passe", valeurs.motdepasse);

      // Redirection vers le dashboard
      router.push("/etudiant/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur réseau ou serveur, réessayez plus tard.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">
          Connexion Etudiant
        </h1>

        <Formulaire champs={champs} onSubmit={handleFormSubmit} />

        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/" className="text-blue-700 hover:underline">
            Retour à l'accueil
          </Link>
          <Link href="/etudiant/inscription" className="text-blue-700 hover:underline">
            Nouveau ? Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}
