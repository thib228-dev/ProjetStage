"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function NouvelEtudiantStep3({ onSubmit }) {
  const [formulaire, setFormulaire] = useState({
    parcours: "LF",
    filiere: "",
    annee: ""
  });
  const [erreurs, setErreurs] = useState({});

  // Options disponibles
  const optionsParcours = {
    LF: {
      nom: "Licence Fondamentale",
      filieres: ["IA & Big Data", "Génie Civil", "Génie Electrique", "Génie Mécanique"],
      annees: ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"]
    },
    LP: {
      nom: "Licence Professionnelle",
      filieres: ["Génie Logiciel", "Réseaux", "Génie Civil", "Génie Electrique", "Génie Mécanique"],
      annees: ["Licence 1", "Licence 2", "Licence 3"]
    }
  };

  // Charger les données sauvegardées
  useEffect(() => {
    const chargerDonnees = () => {
      const donneesSauvegardees = localStorage.getItem("inscription_step3");
      if (donneesSauvegardees) {
        setFormulaire(JSON.parse(donneesSauvegardees));
      }
    };
    chargerDonnees();
  }, []);

  const gererChangement = (e) => {
    const { name, value } = e.target;
    
    // Réinitialiser les dépendances si le parcours change
    const nouvellesValeurs = { [name]: value };
    if (name === "parcours") {
      nouvellesValeurs.filiere = "";
      nouvellesValeurs.annee = "";
    } else if (name === "filiere") {
      nouvellesValeurs.annee = "";
    }

    setFormulaire(prev => ({ 
      ...prev, 
      ...nouvellesValeurs 
    }));

    // Effacer les erreurs quand l'utilisateur modifie
    if (erreurs[name]) {
      setErreurs(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validerFormulaire = () => {
    const nouvellesErreurs = {};
    
    if (!formulaire.filiere) {
      nouvellesErreurs.filiere = "Veuillez sélectionner une filière";
    }
    
    if (!formulaire.annee) {
      nouvellesErreurs.annee = "Veuillez sélectionner une année";
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const soumettreFormulaire = (e) => {
    e.preventDefault();
    if (!validerFormulaire()) return;

    // Sauvegarder dans localStorage
    localStorage.setItem("inscription_step3", JSON.stringify(formulaire));
    
    // Passer à l'étape suivante
    onSubmit(formulaire);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-150 via-yellow-50 to-blue-200 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        {/* Lien retour */}
        <div className="w-full max-w-lg mb-6 self-start px-2">
          <Link 
            href="/etudiant/inscription/etape-2" 
            className="text-black font-semibold hover:underline"
          >
            ← Page précédente
          </Link>
        </div>

        {/* Indicateurs d'étapes */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((etape) => (
            <div 
              key={etape} 
              className={`flex flex-col items-center ${etape === 3 ? 'text-blue-700' : 'text-gray-400'}`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                etape === 3 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'
              } font-bold text-lg transition-all`}>
                {etape}
              </div>
              {etape < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <form 
          onSubmit={soumettreFormulaire} 
          className="bg-transparent backdrop-blur-md px-8 py-10 w-full max-w-lg flex flex-col gap-6 shadow-xl border border-gray-300 rounded-lg animate-fade-in"
        >
          {/* Parcours */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Parcours*</label>
            <select
              name="parcours"
              value={formulaire.parcours}
              onChange={gererChangement}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
            >
              <option value="LF">Licence Fondamentale</option>
              <option value="LP">Licence Professionnelle</option>
            </select>
          </div>

          {/* Filière */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Filière*</label>
            <select
              name="filiere"
              value={formulaire.filiere}
              onChange={gererChangement}
              className={`w-full px-4 py-2 rounded-lg border ${
                erreurs.filiere ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
            >
              <option value="">Sélectionnez une filière</option>
              {optionsParcours[formulaire.parcours].filieres.map((filiere, index) => (
                <option key={index} value={filiere}>
                  {filiere}
                </option>
              ))}
            </select>
            {erreurs.filiere && <p className="text-red-500 text-sm mt-1">{erreurs.filiere}</p>}
          </div>

          {/* Année */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Année*</label>
            <select
              name="annee"
              value={formulaire.annee}
              onChange={gererChangement}
              className={`w-full px-4 py-2 rounded-lg border ${
                erreurs.annee ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
            >
              <option value="">Sélectionnez une année</option>
              {optionsParcours[formulaire.parcours].annees.map((annee, index) => (
                <option key={index} value={annee}>
                  {annee}
                </option>
              ))}
            </select>
            {erreurs.annee && <p className="text-red-500 text-sm mt-1">{erreurs.annee}</p>}
          </div>

          {/* Boutons */}
          <div className="flex justify-between mt-6 gap-4">
            <Link
              href="/etudiant/inscription/etape-2"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full shadow transition-all text-center"
            >
              Retour
            </Link>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-full shadow transition-all"
            >
              Suivant
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}