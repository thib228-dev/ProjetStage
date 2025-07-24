import React from "react";
import { FaClipboardList } from "react-icons/fa";

const notes = [
  { etudiant: "Afi Sandrine", ue: "Programmation Web", note: 15, session: "Normale", statut: "Validé" },
  { etudiant: "Komi Kossi", ue: "Analyse Numérique", note: 12, session: "Normale", statut: "Validé" },
];

export default function GestionNotesAdmin() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-4xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-6">
        <FaClipboardList className="text-teal-700" /> Gestion des notes
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-teal-800">
              <th className="px-3 py-2">Étudiant</th>
              <th className="px-3 py-2">UE</th>
              <th className="px-3 py-2">Note</th>
              <th className="px-3 py-2">Session</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((n, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-teal-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-teal-900">{n.etudiant}</td>
                <td className="px-3 py-2">{n.ue}</td>
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