"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { authAPI } from '@/services/authService';

export default function NouvelEtudiantStep1({ onNext }) {
  const [formulaire, setFormulaire] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
  });
  const [erreurs, setErreurs] = useState({});
  const [chargement, setChargement] = useState(false);

  // Chargement des données sauvegardées
  useEffect(() => {
    const chargerDonnees = () => {
      const donneesSauvegardees = localStorage.getItem("inscription_step1");
      if (donneesSauvegardees) {
        const parsed = JSON.parse(donneesSauvegardees);
        setFormulaire(prev => ({
          ...prev,
          username: parsed.username || "",
          password: "",
          password_confirmation: "",
          email: parsed.email || "",
        }));
      }
    };
    chargerDonnees();
  }, []);

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setFormulaire(prev => ({ ...prev, [name]: value }));
    if (erreurs[name]) {
      setErreurs(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validerFormulaire = () => {
    const nouvellesErreurs = {};
    
    if (!formulaire.email.trim()) {
      nouvellesErreurs.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulaire.email)) {
      nouvellesErreurs.email = "Email invalide";
    }
    
    if (!formulaire.username.trim()) nouvellesErreurs.username = "Un nom d'utilisateur est requis";
    if (!formulaire.password) {
      nouvellesErreurs.password = "Un mot de passe est requis";
    } else if (formulaire.password.length < 8) {
      nouvellesErreurs.password = "Le mot de passe doit faire au moins 8 caractères";
    }
    if (formulaire.password !== formulaire.password_confirmation) {
      nouvellesErreurs.password_confirmation = "Les mots de passe ne correspondent pas";
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const soumettreFormulaire = async (e) => {
    e.preventDefault();
    if (!validerFormulaire()) return;

    setChargement(true);

    try {
      // Sauvegarder les données pour l'étape suivante
      const donneesAEtager = {
        ...formulaire,
      };
      localStorage.setItem("inscription_step1", JSON.stringify(donneesAEtager));
      
      onNext?.(); 
    } catch (error) {
      console.error("Erreur:", error);
      setErreurs({ formulaire: "Une erreur s'est produite" });
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 font-sans flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-lg mb-6 self-start px-2">
          <Link href="/" className="text-blue-700 font-semibold hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>

        {/* Indicateurs d'étapes */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((etape) => (
            <div key={etape} className={`flex flex-col items-center ${etape === 1 ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                etape === 1 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'
              } font-bold text-lg transition-all`}>
                {etape}
              </div>
              {etape < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>

        <form onSubmit={soumettreFormulaire} className="bg-transparent backdrop-blur-md px-8 py-10 w-full max-w-lg flex flex-col gap-6 animate-fade-in border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Création du compte</h2>
          
          {/* Champ Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email*</label>
            <input
              name="email"
              value={formulaire.email}
              onChange={gererChangement}
              type="email"
              className={`w-full px-4 py-2 rounded-lg border ${
                erreurs.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="exemple@email.com"
            />
            {erreurs.email && <p className="text-red-500 text-sm mt-1">{erreurs.email}</p>}
          </div>

          {/* Champ Nom d'utilisateur */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nom d'utilisateur*</label>
            <input
              name="username"
              value={formulaire.username}
              onChange={gererChangement}
              autoComplete="off"
              type="text"
              className={`w-full px-4 py-2 rounded-lg border ${
                erreurs.username ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Choisissez un nom d'utilisateur unique"
            />
            {erreurs.username && <p className="text-red-500 text-sm mt-1">{erreurs.username}</p>}
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mot de passe*</label>
            <input
              name="password"
              value={formulaire.password}
              onChange={gererChangement}
              type="password"
              className={`w-full px-4 py-2 rounded-lg border ${
                erreurs.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Créez un mot de passe sécurisé"
            />
            {erreurs.password && <p className="text-red-500 text-sm mt-1">{erreurs.password}</p>}
          </div>

          {/* Champ Confirmation mot de passe */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirmer le mot de passe*</label>
            <input
              name="password_confirmation"
              value={formulaire.password_confirmation}
              onChange={gererChangement}
              type="password"
              className={`w-full px-4 py-2 rounded-lg border ${
                erreurs.password_confirmation ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Retapez votre mot de passe"
            />
            {erreurs.password_confirmation && <p className="text-red-500 text-sm mt-1">{erreurs.password_confirmation}</p>}
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-between mt-6 gap-4">
            <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg shadow transition-all text-center">
              Annuler
            </Link>
            <button 
              type="submit" 
              disabled={chargement}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-lg shadow transition-all disabled:opacity-50"
            >
              {chargement ? "Validation..." : "Suivant"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}