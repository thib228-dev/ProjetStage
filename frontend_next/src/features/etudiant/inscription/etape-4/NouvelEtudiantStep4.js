"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import inscriptionService from "@/services/inscriptionService";
import { authAPI } from '@/services/authService';
import api from "@/services/api";

export default function NouvelEtudiantStep4() {
  const [ues, setUes] = useState([]);
  const [selectedUEs, setSelectedUEs] = useState({});
  const [infosPedagogiques, setInfosPedagogiques] = useState({
    parcours_id: null,
    filiere_id: null,
    annee_etude_id: null,
    parcours_libelle: "",
    filiere_nom: "",
    annee_etude_libelle: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Charger les données des étapes précédentes
  useEffect(() => {
    const loadAllData = () => {
      // Vérifier que toutes les données sont présentes
      const step1Data = localStorage.getItem("inscription_step1");
      const step2Data = localStorage.getItem("inscription_step2");
      const step3Data = localStorage.getItem("inscription_step3");
      
      if (!step1Data || !step2Data || !step3Data) {
        setError("Données d'inscription incomplètes. Veuillez reprendre depuis le début.");
        router.push("/etudiant/inscription/etape-1");
        return;
      }

      const parsedStep3 = JSON.parse(step3Data);
      setInfosPedagogiques(parsedStep3);
      
      // Charger les UEs pour cette configuration
      fetchUEs({
        parcours: parsedStep3.parcours_id,
        filiere: parsedStep3.filiere_id,
        annee_etude: parsedStep3.annee_etude_id,
      });
    };
    
    loadAllData();
  }, [router]);

  // Récupérer les UEs depuis l'API (sans authentification)
  const fetchUEs = async (params) => {
    setLoading(true);
    try {
      const response = await inscriptionService.getUEs({
        parcours: params.parcours,
        filiere: params.filiere,
        annee_etude: params.annee_etude,
      });
      setUes(response);
    } catch (err) {
      setError("Erreur lors de la récupération des UEs.");
      console.error("Erreur dans fetchUEs:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la sélection des UEs
  const handleCheckboxChange = (ueId) => {
    setSelectedUEs((prev) => ({
      ...prev,
      [ueId]: !prev[ueId],
    }));
  };

  // Convertir base64 en File object pour FormData
  const base64ToFile = (base64String, filename, mimeType) => {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mimeType });
  };

  // Création atomique complète : Utilisateur + Étudiant + Inscription
  const createCompleteRegistration = async (allData, selectedUEIds) => {
    // Préparer FormData pour l'étudiant
    const formData = new FormData();
    
    // Données utilisateur (étape 1)
    formData.append('username', allData.step1.username);
    formData.append('password', allData.step1.password);
    formData.append('email', allData.step1.email);
    formData.append('first_name', allData.step2.prenom);
    formData.append('last_name', allData.step2.nom);
    formData.append('telephone', allData.step2.contact);
    
    // Données étudiant (étape 2)
    formData.append('date_naiss', allData.step2.date_naissance);
    formData.append('lieu_naiss', allData.step2.lieu_naiss);
    if (allData.step2.autre_prenom) {
      formData.append('autre_prenom', allData.step2.autre_prenom);
    }
    if (allData.step2.num_carte) {
      formData.append('num_carte', allData.step2.num_carte);
    }
    
    // Gérer la photo si elle existe
    if (allData.step2.photoBase64 && allData.step2.photoNom) {
      const photoFile = base64ToFile(
        allData.step2.photoBase64, 
        allData.step2.photoNom, 
        'image/jpeg'
      );
      formData.append('photo', photoFile);
    }

    // Étape 1 : Créer l'utilisateur et l'étudiant
    const userResponse = await authAPI.apiInstance().post('/auth/register-etudiant/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { user_id, etudiant_id } = userResponse.data;

    // Étape 2 : Récupérer l'année académique active
    const anneeResponse = await api.get("/inscription/annee-academique/", {
      params: { ordering: "-libelle" },
    });
    const anneeAcademiqueId = anneeResponse.data[0]?.id;

    if (!anneeAcademiqueId) {
      throw new Error("Aucune année académique disponible.");
    }

    // Étape 3 : Créer l'inscription pédagogique
    const inscriptionData = {
      etudiant: etudiant_id,
      parcours: allData.step3.parcours_id,
      filiere: allData.step3.filiere_id,
      annee_etude: allData.step3.annee_etude_id,
      anneeAcademique: anneeAcademiqueId,
      ues: selectedUEIds,
      numero: `INS-${Date.now()}`,
    };

    const inscriptionResponse = await inscriptionService.createInscription(inscriptionData);

    return {
      user: userResponse.data,
      inscription: inscriptionResponse
    };
  };

  // Soumettre l'inscription complète
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Vérifier si au moins une UE est sélectionnée
    const selectedUEIds = Object.keys(selectedUEs)
      .filter((id) => selectedUEs[id])
      .map(Number);
      
    if (selectedUEIds.length === 0) {
      setError("Veuillez sélectionner au moins une UE.");
      setLoading(false);
      return;
    }

    // Vérifier le total des crédits
    const totalCredits = ues
      .filter((ue) => selectedUEs[ue.id])
      .reduce((sum, ue) => sum + ue.nbre_credit, 0);
      
    if (totalCredits > 30) {
      setError("Le total des crédits ne peut pas dépasser 30.");
      setLoading(false);
      return;
    }

    try {
      // Récupérer toutes les données des étapes
      const step1Data = JSON.parse(localStorage.getItem("inscription_step1"));
      const step2Data = JSON.parse(localStorage.getItem("inscription_step2"));
      const step3Data = JSON.parse(localStorage.getItem("inscription_step3"));

      const allData = {
        step1: step1Data,
        step2: step2Data,
        step3: step3Data
      };

      console.log("🚀 Début de la création atomique...");
      
      // Créer tout en une fois
      const result = await createCompleteRegistration(allData, selectedUEIds);
      
      console.log("✅ Inscription complète réussie:", result);

      // Nettoyer le localStorage
      localStorage.removeItem("inscription_step1");
      localStorage.removeItem("inscription_step2");
      localStorage.removeItem("inscription_step3");

      // Rediriger vers la page de confirmation
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");      
          
      
      // Gestion spécifique des erreurs
      if (err.response?.status === 400) {
        const errors = err.response.data;
        if (errors.username) {
          setError("Ce nom d'utilisateur existe déjà. Veuillez en choisir un autre.");
        } else if (errors.email) {
          setError("Cette adresse email est déjà utilisée.");
        } else {
          setError("Erreur de validation des données. Vérifiez vos informations.");
        }
      } else {
        setError("Erreur lors de la finalisation de l'inscription. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculer le total des crédits sélectionnés
  const totalCreditsSelectionnes = ues
    .filter((ue) => selectedUEs[ue.id])
    .reduce((sum, ue) => sum + ue.nbre_credit, 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Finalisation de l'inscription
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">❌</span>
            {error}
          </div>
        </div>
      )}

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">📋 Récapitulatif de votre inscription</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <p><strong>Filière:</strong> {infosPedagogiques.filiere_nom}</p>
          <p><strong>Parcours:</strong> {infosPedagogiques.parcours_libelle}</p>
          <p><strong>Année:</strong> {infosPedagogiques.annee_etude_libelle}</p>
        </div>
      </div>

      <div className="mb-4 text-center">
        <p className="text-lg font-semibold">
          Crédits sélectionnés: <span className={totalCreditsSelectionnes > 30 ? "text-red-600" : "text-green-600"}>{totalCreditsSelectionnes}/30</span>
        </p>
        {totalCreditsSelectionnes > 70 && (
          <p className="text-red-500 text-sm">⚠️ Le total des crédits ne peut pas dépasser 70</p>
        )}
      </div>

      {/* Tableau des UEs */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Sélection</th>
              <th className="border p-2">Code UE</th>
              <th className="border p-2">Libellé</th>
              <th className="border p-2">Crédits</th>
              <th className="border p-2">Semestre</th>
            </tr>
          </thead>
          <tbody>
            {ues.map((ue) => (
              <tr key={ue.id} className="hover:bg-gray-50">
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedUEs[ue.id] || false}
                    onChange={() => handleCheckboxChange(ue.id)}
                    className="w-5 h-5 accent-blue-600"
                  />
                </td>
                <td className="border p-2">{ue.code}</td>
                <td className="border p-2">{ue.libelle}</td>
                <td className="border p-2 text-center">{ue.nbre_credit}</td>
                <td className="border p-2 text-center">
                  {ue.semestre?.libelle || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ues.length === 0 && (
        <div className="text-center text-gray-500 mb-6">
          Aucune UE disponible pour ces critères.
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex justify-between mt-6 gap-4">
        <Link
          href="/etudiant/inscription/etape-3"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded-lg shadow transition-all text-center"
        >
          Retour
        </Link>
        <button
          type="submit"
          disabled={loading || ues.length === 0}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enregistrement..." : "Finaliser l'inscription"}
        </button>
      </div>
    </form>
  );
}