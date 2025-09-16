"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import inscriptionService from "@/services/inscriptionService";
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

  // Configurer l'intercepteur pour inclure le token JWT
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Vous devez être connecté pour continuer.");
      router.push("/login");
      return;
    }
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [router]);

  // Charger les données de l'étape 3 depuis localStorage
  useEffect(() => {
    const loadSavedData = () => {
      const savedData = localStorage.getItem("inscription_step3");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setInfosPedagogiques(parsedData);
        fetchUEs({
          parcours: parsedData.parcours_id,
          filiere: parsedData.filiere_id,
          annee_etude: parsedData.annee_etude_id,
        });
      } else {
        setError("Aucune donnée pédagogique trouvée. Veuillez compléter l'étape 3.");
        router.push("/etudiant/inscription/etape-3");
      }
    };
    loadSavedData();
  }, [router]);

  // Récupérer les UEs depuis l'API
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

  // Soumettre l'inscription
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
      // Récupérer l'ID de l'étudiant connecté
      const userResponse = await api.get("/auth/me/");
      const etudiantId = userResponse.data.etudiant_id;

      // Récupérer l'année académique active
      const anneeResponse = await api.get("/inscription/annee-academique/", {
        params: { ordering: "-libelle" }, // Prendre la plus récente
      });
      const anneeAcademiqueId = anneeResponse.data[0]?.id;

      if (!anneeAcademiqueId) {
        throw new Error("Aucune année académique disponible.");
      }

      // Préparer les données pour l'inscription
      const inscriptionData = {
        etudiant: etudiantId,
        parcours: infosPedagogiques.parcours_id,
        filiere: infosPedagogiques.filiere_id,
        annee_etude: infosPedagogiques.annee_etude_id,
        anneeAcademique: anneeAcademiqueId,
        ues: selectedUEIds,
        numero: `INS-${Date.now()}`,
      };

      // Envoyer la requête POST
      const response = await inscriptionService.createInscription(inscriptionData);
      console.log("Inscription réussie:", response);

      // Nettoyer le localStorage
      localStorage.removeItem("inscription_step1");
      localStorage.removeItem("inscription_step3");

      // Rediriger vers la page de confirmation
      router.push("/etudiant/inscription/confirmation");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Erreur lors de la finalisation de l'inscription."
      );
      console.error("Erreur dans handleSubmit:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Sélection des Unités d'Enseignement
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">UE disponibles pour :</h3>
        <p>Filière: {infosPedagogiques.filiere_nom}</p>
        <p>Parcours: {infosPedagogiques.parcours_libelle}</p>
        <p>Année: {infosPedagogiques.annee_etude_libelle}</p>
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