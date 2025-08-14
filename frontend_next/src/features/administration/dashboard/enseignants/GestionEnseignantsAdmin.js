/* import React from "react";
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
} */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";

export default function GestionEnseignants() {
  const [filterNom, setFilterNom] = useState("");
  const [filterTitre, setFilterTitre] = useState("");
  const router = useRouter();

  const enseignants = [
    {
      nom: "Kossi",
      prenom: "Kodjo",
      email: "k.kodjo@epl.tg",
      telephone: "+228 90 12 34 56",
      titre: "Professeur",
    },
    {
      nom: "Mensah",
      prenom: "Akouvi",
      email: "a.mensah@epl.tg",
      telephone: "+228 99 87 65 43",
      titre: "Maître Assistant",
    },
  ];

  const filtered = enseignants.filter(
    (e) =>
      e.nom.toLowerCase().includes(filterNom.toLowerCase()) &&
      e.titre.toLowerCase().includes(filterTitre.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 space-y-8">
      
      {/* Barre supérieure avec bouton + filtres */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Bouton Ajouter */}
        <button onClick={() => router.push("/administration/nouvel-utilisateur")}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-5 h-5" /> Ajouter
        </button>

        {/* Filtres */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 w-full md:w-auto">
          <div className="flex items-center border rounded-lg px-3 w-full md:w-64">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Filtrer par nom"
              value={filterNom}
              onChange={(e) => setFilterNom(e.target.value)}
              className="flex-1 px-2 py-2 outline-none"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 w-full md:w-64">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Filtrer par titre"
              value={filterTitre}
              onChange={(e) => setFilterTitre(e.target.value)}
              className="flex-1 px-2 py-2 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tableau en dessous */}
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Prénom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Téléphone</th>
              <th className="p-3 text-left">Titre</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, idx) => (
              <tr key={idx} className="border-b hover:bg-blue-50 transition">
                <td className="p-3 font-semibold text-gray-800">{e.nom}</td>
                <td className="p-3">{e.prenom}</td>
                <td className="p-3 text-blue-600">{e.email}</td>
                <td className="p-3">{e.telephone}</td>
                <td className="p-3">{e.titre}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Aucun enseignant trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
