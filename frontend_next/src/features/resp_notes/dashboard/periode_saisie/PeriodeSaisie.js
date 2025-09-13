import React from "react";
import { FaFileAlt } from "react-icons/fa";

/**
 * @file articles\page.js
 * @description Composant React pour l'affichage des articles scientifiques dans l'interface d'administration.
 *
 * Ce composant affiche une liste statique d’articles avec :
 * - Le titre de l’article
 * - Le nom de la revue
 * - L’année de publication
 * - Un lien vers l’article 
 *
 * @component
 * @returns {JSX.Element} Un tableau des articles affiché dans une carte stylisée
 */

const articles = [
  { titre: "Optimisation des algorithmes", revue: "Revue Info Togo", annee: "2023", lien: "#" },
  { titre: "Sécurité web", revue: "Journal IT Afrique", annee: "2022", lien: "#" },
];

export default function GestionArticlesAdmin() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-4xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-6">
        <FaFileAlt className="text-teal-700" /> Gestion des articles
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-teal-800">
              <th className="px-3 py-2">Titre</th>
              <th className="px-3 py-2">Revue</th>
              <th className="px-3 py-2">Année</th>
              <th className="px-3 py-2">Lien</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a, idx) => (
              <tr key={idx} className="bg-white/70 hover:bg-teal-50 transition rounded-xl shadow">
                <td className="px-3 py-2 font-semibold text-teal-900">{a.titre}</td>
                <td className="px-3 py-2">{a.revue}</td>
                <td className="px-3 py-2">{a.annee}</td>
                <td className="px-3 py-2">
                  <a href={a.lien} className="text-teal-700 underline hover:text-teal-900">Voir</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}