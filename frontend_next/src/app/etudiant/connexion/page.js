"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConnexionEtudiant() {
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    router.push("/etudiant/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-md animate-fade-in">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Connexion Étudiant</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Matricule ou Email</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="Matricule ou email" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
            <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="Votre mot de passe" />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-full shadow transition-all mt-2">Connexion</button>
        </form>
        <div className="mt-6 text-center flex flex-col gap-2">
          <Link href="/" className="text-blue-700 hover:underline">Retour à l'accueil</Link>
          <Link href="/etudiant/inscription" className="text-blue-700 hover:underline">Nouveau ? Inscrivez-vous</Link>
        </div>
      </div>
    </div>
  );
}
