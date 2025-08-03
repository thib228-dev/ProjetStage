import React from "react";
import { FaFileAlt } from "react-icons/fa";

const articles = [
  { titre: "Optimisation des algorithmes", revue: "Revue Info Togo", annee: "2023", lien: "#" },
  { titre: "Sécurité web", revue: "Journal IT Afrique", annee: "2022", lien: "#" },
];

export default function ArticlesPubliesProf() {
  return (
    <div className="bg-transparent backdrop-blur-md  px-8 py-10 w-full  animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-orange-900 mb-6">
        <FaFileAlt className="text-orange-700" /> Articles publiés
      </h2>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-orange-800">
              <th className="px-3 py-2">Titre</th>
              <th className="px-3 py-2">Revue</th>
              <th className="px-3 py-2">Année</th>
              <th className="px-3 py-2">Lien</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-orange-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-orange-900">{a.titre}</td>
                <td className="px-3 py-2">{a.revue}</td>
                <td className="px-3 py-2">{a.annee}</td>
                <td className="px-3 py-2">
                  <a href={a.lien} className="text-orange-700 underline hover:text-orange-900">Voir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 