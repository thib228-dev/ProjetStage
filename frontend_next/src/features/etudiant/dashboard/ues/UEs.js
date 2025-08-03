import React from "react";
import { FaBook } from "react-icons/fa";

const ues = [
  { code: "INF 130", libelle: "Structure de données", credits: 4, prof: "Kossi Kodjo" },
  { code: "INF 140", libelle: "Analyse Numérique", credits: 3, prof: "Mensah Akouvi" },
  { code: "INF 150", libelle: "Programmation Mobile", credits: 4, prof: "Tchalla Yao" },
];

export default function UEs() {
  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl px-10 py-12 w-full max-w-4xl animate-fade-in border border-blue-100">
      <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 mb-8 drop-shadow">
        <FaBook className="text-blue-700 text-3xl" /> Mes UEs
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-blue-800">
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Libellé</th>
              <th className="px-3 py-2">Crédits</th>
              <th className="px-3 py-2">Professeur</th>
            </tr>
          </thead>
          <tbody>
            {ues.map((ue, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-blue-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-blue-900">{ue.code}</td>
                <td className="px-3 py-2">{ue.libelle}</td>
                <td className="px-3 py-2 text-center">{ue.credits}</td>
                <td className="px-3 py-2">{ue.prof}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}