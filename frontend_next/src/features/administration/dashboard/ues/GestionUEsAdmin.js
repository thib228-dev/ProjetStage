import React from "react";
import { FaBook } from "react-icons/fa";

const ues = [
  { code: "INF 130", libelle: "Structure de données", credits: 4, enseignant: "Kossi Kodjo" },
  { code: "INF 140", libelle: "Analyse Numérique", credits: 3, enseignant: "Mensah Akouvi" },
];

export default function GestionUEsAdmin() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-4xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-6">
        <FaBook className="text-teal-700" /> Gestion des UEs
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-teal-800">
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Libellé</th>
              <th className="px-3 py-2">Crédits</th>
              <th className="px-3 py-2">Enseignant</th>
            </tr>
          </thead>
          <tbody>
            {ues.map((ue, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-teal-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-teal-900">{ue.code}</td>
                <td className="px-3 py-2">{ue.libelle}</td>
                <td className="px-3 py-2 text-center">{ue.credits}</td>
                <td className="px-3 py-2">{ue.enseignant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}