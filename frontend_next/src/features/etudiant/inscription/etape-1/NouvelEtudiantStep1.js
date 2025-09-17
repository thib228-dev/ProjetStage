"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { validateForm } from "@/components/ui/ValidationUtils"; 

// Configuration des champs pour l'étape 1
const step1FieldsConfig = {
  email: { required: true },
  username: { required: true },
  password: { required: true },
  password_confirmation: { required: true },
};

export default function NouvelEtudiantStep1() { 
  const [formulaire, setFormulaire] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
   
  });
  const [erreurs, setErreurs] = useState({});
  const [chargement, setChargement] = useState(false);
  const router = useRouter(); 

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
    const nouvellesErreurs = validateForm(formulaire, step1FieldsConfig);
    
    // Validation supplémentaire pour la confirmation de mot de passe
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
      
      router.push('/etudiant/inscription/etape-2');
    } catch (error) {
      console.error("Erreur:", error);
      setErreurs({ formulaire: "Une erreur s'est produite" });
    } finally {
      setChargement(false);
    }
  };

  return (
    <form onSubmit={soumettreFormulaire} className="flex flex-col gap-6 mx-auto w-full max-w-lg bg-white/80 backdrop-blur-md px-8 py-10 border border-gray-300 rounded-lg shadow-lg">
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
          } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`} 
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
          } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`} 
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
          } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`} 
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
          } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`} 
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
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-lg shadow transition-all disabled:opacity-50">
          {chargement ? "Validation..." : "Suivant"}
        </button>
      </div>
    </form>
  );
}