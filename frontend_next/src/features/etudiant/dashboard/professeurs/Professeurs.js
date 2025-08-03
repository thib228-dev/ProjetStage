import React from "react";
import { FaUserTie } from "react-icons/fa";

const professeurs = [
  { nom: "Kossi", prenom: "Kodjo", email: "k.kodjo@epl.tg", matiere: "Programmation Web" },
  { nom: "Mensah", prenom: "Akouvi", email: "a.mensah@epl.tg", matiere: "Analyse Numérique" },
  { nom: "Tchalla", prenom: "Yao", email: "y.tchalla@epl.tg", matiere: "Génie Logiciel" },
];

export default function Professeurs() {
  return (
    <div className="bg-transparent backdrop-blur-2xl   px-10 py-12 w-full  animate-fade-in ">
      <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 mb-8 drop-shadow justify-center">
        <FaUserTie className="text-blue-700 text-3xl" /> Mes Professeurs
      </h2>
      <div className="overflow-x-auto mt-30">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-blue-800">
              <th className="px-3 py-2">Nom</th>
              <th className="px-3 py-2">Prénom</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Matière</th>
            </tr>
          </thead>
          <tbody>
            {professeurs.map((prof, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-white/70" : "bg-blue-100/60"
                } hover:bg-blue-50 transition rounded-xl shadow`}
              >
                <td className="px-3 py-2 font-semibold text-blue-900">{prof.nom}</td>
                <td className="px-3 py-2">{prof.prenom}</td>
                <td className="px-3 py-2">{prof.email}</td>
                <td className="px-3 py-2">{prof.matiere}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}