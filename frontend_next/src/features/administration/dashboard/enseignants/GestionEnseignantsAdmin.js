import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

const enseignants = [
  { nom: "Kossi", prenom: "Kodjo", email: "k.kodjo@epl.tg", specialite: "Programmation Web", statut: "Actif" },
  { nom: "Mensah", prenom: "Akouvi", email: "a.mensah@epl.tg", specialite: "Analyse Numérique", statut: "Inactif" },
];

export default function GestionEnseignantsAdmin() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-4xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-6">
        <FaChalkboardTeacher className="text-teal-700" /> Gestion des enseignants
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-teal-800">
              <th className="px-3 py-2">Nom</th>
              <th className="px-3 py-2">Prénom</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Spécialité</th>
              <th className="px-3 py-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {enseignants.map((e, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-teal-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-teal-900">{e.nom}</td>
                <td className="px-3 py-2">{e.prenom}</td>
                <td className="px-3 py-2">{e.email}</td>
                <td className="px-3 py-2">{e.specialite}</td>
                <td className={"px-3 py-2 font-bold " + (e.statut === "Actif" ? "text-green-700" : "text-red-600")}>{e.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 