import React from "react";
import { FaUsers } from "react-icons/fa";

const encadrements = [
  { etudiant: "A. Sandrine", sujet: "App mobile EPL", annee: "2023", statut: "En cours" },
  { etudiant: "B. Yao", sujet: "Site web EPL", annee: "2022", statut: "Terminé" },
];

export default function EncadrementsProf() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-3xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-orange-900 mb-6">
        <FaUsers className="text-orange-700" /> Encadrements
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-orange-800">
              <th className="px-3 py-2">Étudiant</th>
              <th className="px-3 py-2">Sujet</th>
              <th className="px-3 py-2">Année</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {encadrements.map((e, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-orange-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-orange-900">{e.etudiant}</td>
                <td className="px-3 py-2">{e.sujet}</td>
                <td className="px-3 py-2">{e.annee}</td>
                <td className={"px-3 py-2 font-bold " + (e.statut === "Terminé" ? "text-green-700" : "text-orange-600")}>{e.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}