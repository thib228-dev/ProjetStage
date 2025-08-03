import React from "react";
import { FaStar } from "react-icons/fa";

const notes = [
  { ue: "Structure de données", note: 15, session: "Normale", statut: "Validé" },
  { ue: "Analyse Numérique", note: 12, session: "Normale", statut: "Validé" },
  { ue: "Programmation Mobile", note: 8, session: "Rattrapage", statut: "Non validé" },
];

export default function Notes() {
  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl px-10 py-12 w-full max-w-4xl animate-fade-in border border-blue-100">
      <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 mb-8 drop-shadow">
        <FaStar className="text-blue-700 text-3xl" /> Mes Notes
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-blue-800">
              <th className="px-3 py-2">UE</th>
              <th className="px-3 py-2">Note</th>
              <th className="px-3 py-2">Session</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-blue-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-blue-900">{n.ue}</td>
                <td className="px-3 py-2 text-center">{n.note}</td>
                <td className="px-3 py-2">{n.session}</td>
                <td className={"px-3 py-2 font-bold " + (n.statut === "Validé" ? "text-green-700" : "text-red-600")}>{n.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 