"use client";
import React, { useState, useEffect } from "react";
import { inscriptionService } from "@/services/inscriptionService";

export default function NouvelEtudiantStep4({ onBack, onComplete }) {
  const [ues, setUes] = useState([]);
  const [selectedUEs, setSelectedUEs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Récupérer les données des étapes précédentes
  const etudiantData = JSON.parse(localStorage.getItem("inscription_step1") || "{}");
  const infosPedagogiques = JSON.parse(localStorage.getItem("inscription_step3") || "{}");

  // 🔹 Récupération des UE selon filière, parcours, année
  useEffect(() => {
    const fetchUEs = async () => {
      try {
        const params = {
          filiere: infosPedagogiques.filiere_id,
          parcours: infosPedagogiques.parcours_id,
          annee_etude: infosPedagogiques.annee_etude_id
        };

        const res = await inscriptionService.getUEs(params);
        setUes(res);

        // Cocher toutes les UE par défaut
        const initialSelection = {};
        res.forEach(ue => {
          initialSelection[ue.id] = true;
        });
        setSelectedUEs(initialSelection);

      } catch (err) {
        console.error("Erreur récupération UE:", err);
        setError("Impossible de récupérer les UE");
      }
    };

    if (infosPedagogiques.filiere_id) {
      fetchUEs();
    }
  }, [infosPedagogiques]);

  const handleCheckboxChange = (ueId) => {
    setSelectedUEs(prev => ({
      ...prev,
      [ueId]: !prev[ueId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Récupérer les IDs des UE sélectionnées
      const uesSelectionnees = Object.keys(selectedUEs)
        .filter(id => selectedUEs[id])
        .map(id => parseInt(id));

      // Préparer les données pour l'inscription
      const inscriptionData = {
        etudiant: etudiantData.etudiant_id, // ID de l'étudiant créé dans le Step1
        parcours: infosPedagogiques.parcours_id,
        annee_etude: infosPedagogiques.annee_etude_id,
        filiere: infosPedagogiques.filiere_id,
        anneeAcademique: infosPedagogiques.annee_academique_id,
        ues: uesSelectionnees
      };

      console.log("Données inscription:", inscriptionData);

      // Envoyer la requête
      const response = await inscriptionService.createInscription(inscriptionData);
      
      console.log("✅ Inscription réussie:", response.data);
      
      // Nettoyer le localStorage
      localStorage.removeItem("inscription_step1");
      localStorage.removeItem("inscription_step3");
      
      // Rediriger ou afficher message de succès
      alert("Inscription pédagogique réussie !");
      onComplete?.();

    } catch (err) {
      console.error("❌ Erreur inscription:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-150 via-yellow-50 to-blue-200 flex flex-col items-center justify-center px-4 py-12 pt-24">
      
      {/* En-tête */}
      <div className="w-full max-w-4xl mb-6">
        <button onClick={onBack} className="text-blue-700 font-semibold hover:underline">
          ← Page précédente
        </button>
      </div>

      {/* Indicateurs d'étapes */}
      <div className="flex items-center justify-center gap-6 mb-10">
        {[1, 2, 3, 4].map((etape) => (
          <div key={etape} className={`flex flex-col items-center ${etape === 4 ? 'text-blue-700' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
              etape === 4 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'
            } font-bold text-lg`}>
              {etape}
            </div>
            {etape < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sélection des Unités d'Enseignement</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">UE disponibles pour :</h3>
          <p>Filière: {infosPedagogiques.filiere_nom}</p>
          <p>Parcours: {infosPedagogiques.parcours_libelle}</p>
          <p>Année: {infosPedagogiques.annee_etude_libelle}</p>
        </div>

        {/* Tableau des UE */}
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
              {ues.map(ue => (
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
                  <td className="border p-2 text-center">{ue.credits}</td>
                  <td className="border p-2 text-center">{ue.semestre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ues.length === 0 && (
          <div className="text-center text-gray-500 mb-6">
            Aucune UE disponible pour cette combinaison filière/parcours/année
          </div>
        )}

        {/* Boutons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            Retour
          </button>
          
          <button
            type="submit"
            disabled={loading || ues.length === 0}
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enregistrement..." : "Finaliser l'inscription"}
          </button>
        </div>
      </form>
    </div>
  );
}