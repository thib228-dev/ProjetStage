import React from "react";
import { FaProjectDiagram } from "react-icons/fa";

const projets = [
  { titre: "Application mobile EPL", etudiants: "A. Sandrine, K. Komi", annee: "2023", statut: "En cours" },
  { titre: "Site web EPL", etudiants: "B. Yao, M. Akouvi", annee: "2022", statut: "Terminé" },
];

export default function ProjetsEncadresProf() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-3xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-orange-900 mb-6">
        <FaProjectDiagram className="text-orange-700" /> Projets encadrés
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-orange-800">
              <th className="px-3 py-2">Titre</th>
              <th className="px-3 py-2">Étudiants</th>
              <th className="px-3 py-2">Année</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((p, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-orange-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-orange-900">{p.titre}</td>
                <td className="px-3 py-2">{p.etudiants}</td>
                <td className="px-3 py-2">{p.annee}</td>
                <td className={"px-3 py-2 font-bold " + (p.statut === "Terminé" ? "text-green-700" : "text-orange-600")}>{p.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 