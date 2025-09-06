"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import authAPI from '@/services/authService';

export default function NouvelEtudiantStep2({ onNext, onPrev }) {
  const [formulaire, setFormulaire] = useState({
    nom: "",
    prenom: "",
    contact: "",
    date_naissance: "",
    lieu_naiss: "",
    autre_prenom: "",
    photo: null,
  });
  const [apercu, setApercu] = useState(null);
  const [erreurs, setErreurs] = useState({});
  const [chargement, setChargement] = useState(false);

  // Calcul de la date maximale (il y a 15 ans)
  const calculerDateMinimale = () => {
    const aujourdHui = new Date();
    const anneeMinimale = aujourdHui.getFullYear() - 15;
    return new Date(anneeMinimale, aujourdHui.getMonth(), aujourdHui.getDate()).toISOString().split('T')[0];
  };

  // Validation de l'âge (minimum 15 ans)
  const validerAge = (dateNaissance) => {
    const dateNaiss = new Date(dateNaissance);
    const aujourdHui = new Date();
    const ageMinimum = new Date(
      aujourdHui.getFullYear() - 15,
      aujourdHui.getMonth(),
      aujourdHui.getDate()
    );
    return dateNaiss <= ageMinimum;
  };

  // Chargement des données sauvegardées
  useEffect(() => {
    const chargerDonnees = () => {
      const donneesSauvegardees = localStorage.getItem("inscription_step1");
      if (donneesSauvegardees) {
        const parsed = JSON.parse(donneesSauvegardees);
        setFormulaire(prev => ({
          ...prev,
          nom: parsed.nom || "",
          prenom: parsed.prenom || "",
          contact: parsed.contact || "",
          date_naissance: parsed.date_naissance || "",
          lieu_naiss: parsed.lieu_naiss || "",
          autre_prenom: parsed.autre_prenom || "",
          photo: null, // Réinitialiser la photo (ne peut pas être stockée)
        }));
        if (parsed.photoBase64) {
          setApercu(parsed.photoBase64);
        }
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

  const gererChangementPhoto = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    // Validation de la taille (max 2Mo)
    if (fichier.size > 2 * 1024 * 1024) {
      setErreurs({ photo: "La photo ne doit pas dépasser 2Mo" });
      return;
    }

    // Validation du type (JPG/PNG)
    if (!['image/jpeg', 'image/png'].includes(fichier.type)) {
      setErreurs({ photo: "Seuls les formats JPG et PNG sont acceptés" });
      return;
    }

    setFormulaire(prev => ({ ...prev, photo: fichier }));
    setErreurs({});

    const lecteur = new FileReader();
    lecteur.onload = () => {
      const resultatBase64 = lecteur.result;
      setApercu(resultatBase64);

      // Sauvegarde dans localStorage
      const donneesExistantes = JSON.parse(localStorage.getItem("inscription_step1") || "{}");
      localStorage.setItem("inscription_step1", JSON.stringify({
        ...donneesExistantes,
        photoNom: fichier.name,
        photoBase64: resultatBase64,
      }));
    };
    lecteur.readAsDataURL(fichier);

    e.target.value = null;
  };

  const validerFormulaire = () => {
    const nouvellesErreurs = {};

    if (!formulaire.nom.trim()) nouvellesErreurs.nom = "Le nom est requis";
    if (!formulaire.prenom.trim()) nouvellesErreurs.prenom = "Le prénom est requis";

    if (!formulaire.contact.trim()) {
      nouvellesErreurs.contact = "Le contact est requis";
    } else if (formulaire.contact.length < 8) {
      nouvellesErreurs.contact = "Numéro trop court (min 8 caractères)";
    }

    if (!formulaire.date_naissance) {
      nouvellesErreurs.date_naissance = "La date de naissance est requise";
    } else if (!validerAge(formulaire.date_naissance)) {
      nouvellesErreurs.date_naissance = "Vous devez avoir au moins 15 ans pour vous inscrire";
    }

    if (!formulaire.lieu_naiss || !formulaire.lieu_naiss.trim()) {
      nouvellesErreurs.lieu_naiss = "Le lieu de naissance est requis";
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const soumettreFormulaire = async (e) => {
    e.preventDefault();
    if (!validerFormulaire()) return;

    setChargement(true);

    try {
      // Récupérer les données de l'étape 1
      const donneesEtape1 = JSON.parse(localStorage.getItem("inscription_step1") || "{}");

      // Préparer FormData pour l'envoi (inclut la photo)
      const formData = new FormData();

      // Données utilisateur (étape 1)
      formData.append('username', donneesEtape1.username);
      formData.append('password', donneesEtape1.password);
      formData.append('password_confirmation', donneesEtape1.password_confirmation);
      formData.append('email', donneesEtape1.email);
      formData.append('first_name', formulaire.prenom);
      formData.append('last_name', formulaire.nom);
      formData.append('telephone', formulaire.contact);

      // Données étudiant (étape 2)
      formData.append('date_naiss', formulaire.date_naissance);
      formData.append('lieu_naiss', formulaire.lieu_naiss);
      if (formulaire.autre_prenom) {
        formData.append('autre_prenom', formulaire.autre_prenom);
      }
      if (formulaire.photo) {
        formData.append('photo', formulaire.photo);
      }

      // Envoyer les données
      const response = await authAPI.apiInstance().post('/auth/register/etudiant/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;

      // Stocker les données pour les prochaines étapes
      const donneesAEtager = {
        ...donneesEtape1,
        ...formulaire,
        utilisateur_id: data.user_id,
        etudiant_id: data.etudiant_id
      };
      localStorage.setItem("inscription_step1", JSON.stringify(donneesAEtager));

      onNext?.();
    } catch (error) {
      console.error("Erreur API:", error.response?.data || error.message);

      if (error.response?.data) {
        const errors = error.response.data;
        // Gestion des erreurs
        Object.keys(errors).forEach(key => {
          if (errors[key]) {
            setErreurs(prev => ({ ...prev, [key]: Array.isArray(errors[key]) ? errors[key][0] : errors[key] }));
          }
        });
      } else {
        setErreurs({ formulaire: "Erreur de connexion au serveur" });
      }
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-150 via-yellow-50 to-blue-200 font-sans flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-lg mb-6 self-start px-2">
          <button onClick={onPrev} className="text-blue-700 font-semibold hover:underline">
            ← Retour à l'étape précédente
          </button>
        </div>

        {/* Indicateurs d'étapes */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((etape) => (
            <div key={etape} className={`flex flex-col items-center ${etape === 2 ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${etape === 2 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'
                } font-bold text-lg transition-all`}>
                {etape}
              </div>
              {etape < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>

        <form onSubmit={soumettreFormulaire} className="bg-transparent backdrop-blur-md px-8 py-10 w-full max-w-lg flex flex-col gap-6 animate-fade-in border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Informations personnelles</h2>

          <div className="flex flex-col items-center gap-2">
            <label className="block text-gray-700 font-semibold mb-2">Photo de profil</label>
            <div className="relative w-32 h-32 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden mb-2">
              {apercu ? (
                <img
                  src={apercu}
                  alt="Aperçu de la photo de profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.25a8.25 8.25 0 1115 0v.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.25z" />
                </svg>
              )}

              <input
                id="photoInput"
                type="file"
                accept="image/jpeg, image/png"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={gererChangementPhoto}
              />

              <label htmlFor="photoInput" className="absolute bottom-0 bg-white/90 text-black font-medium text-xs px-2 py-1 rounded-full shadow flex items-center gap-1 cursor-pointer hover:bg-white transition-all">
                {apercu ? "Changer" : "Ajouter"}
              </label>
            </div>
            {erreurs.photo && <p className="text-red-500 text-sm">{erreurs.photo}</p>}
            <span className="text-xs text-gray-400">Formats acceptés : JPG, PNG (max 2Mo)</span>
          </div>

          {/* Champ Nom */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nom*</label>
            <input
              name="nom"
              value={formulaire.nom}
              onChange={gererChangement}
              type="text"
              className={`w-full px-4 py-2 rounded-lg border ${erreurs.nom ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Entrez votre nom"
            />
            {erreurs.nom && <p className="text-red-500 text-sm mt-1">{erreurs.nom}</p>}
          </div>

          {/* Champ Prénom */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Prénom*</label>
            <input
              name="prenom"
              value={formulaire.prenom}
              onChange={gererChangement}
              type="text"
              className={`w-full px-4 py-2 rounded-lg border ${erreurs.prenom ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Entrez votre prénom"
            />
            {erreurs.prenom && <p className="text-red-500 text-sm mt-1">{erreurs.prenom}</p>}
          </div>

          {/* Autre prénom */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Autre prénom (optionnel)</label>
            <input
              name="autre_prenom"
              value={formulaire.autre_prenom}
              onChange={gererChangement}
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
              placeholder="Prénom usuel si différent"
            />
          </div>

          {/* Champ Contact */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Téléphone*</label>
            <input
              name="contact"
              value={formulaire.contact}
              onChange={gererChangement}
              type="tel"
              className={`w-full px-4 py-2 rounded-lg border ${erreurs.contact ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Numéro de téléphone"
            />
            {erreurs.contact && <p className="text-red-500 text-sm mt-1">{erreurs.contact}</p>}
          </div>

          {/* Champ Date de naissance */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date de naissance*</label>
            <input
              name="date_naissance"
              value={formulaire.date_naissance}
              onChange={gererChangement}
              type="date"
              max={calculerDateMinimale()}
              className={`w-full px-4 py-2 rounded-lg border ${erreurs.date_naissance ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
            />
            {erreurs.date_naissance ? (
              <p className="text-red-500 text-sm mt-1">{erreurs.date_naissance}</p>
            ) : (
              <p className="text-gray-500 text-xs mt-1">Âge minimum requis : 15 ans</p>
            )}
          </div>

          {/* Champ Lieu de naissance */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Lieu de naissance*</label>
            <input
              name="lieu_naiss"
              value={formulaire.lieu_naiss}
              onChange={gererChangement}
              type="text"
              className={`w-full px-4 py-2 rounded-lg border ${erreurs.lieu_naiss ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70`}
              placeholder="Ex: Abidjan, Côte d'Ivoire"
            />
            {erreurs.lieu_naiss && <p className="text-red-500 text-sm mt-1">{erreurs.lieu_naiss}</p>}
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-between mt-6 gap-4">
            <button
              type="button"
              onClick={onPrev}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-lg shadow transition-all text-center"
            >
              Précédent
            </button>
            <button
              type="submit"
              disabled={chargement}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-lg shadow transition-all disabled:opacity-50"
            >
              {chargement ? "Création..." : "Suivant"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}