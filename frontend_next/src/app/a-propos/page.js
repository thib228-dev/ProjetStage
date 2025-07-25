import React from "react";

/**
 * Composant de la page "à propos"
 * Ce composant affiche une description de l'École Polytechnique de Lomé
 * Il comprend : 
 *-un titre, 
 *-un paragraphe d'introduction, 
 *-une liste des valeurs, 
 *-et une mention de copyright
 * @returns {JSX.Element} Le contenu de la page "à propos"
 */
 
export default function APropos() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-2xl animate-fade-in">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">À propos de l'EPL</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">L'École Polytechnique de Lomé (EPL) est un établissement d'excellence dédié à la formation d'ingénieurs et de scientifiques au service du développement du Togo et de l'Afrique.</p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><span className="font-bold">Mission :</span> Former des ingénieurs compétents, innovants et responsables.</li>
          <li><span className="font-bold">Valeurs :</span> Excellence, intégrité, esprit d'équipe, ouverture internationale.</li>
          <li><span className="font-bold">Histoire :</span> Fondée en 1976, l'EPL a formé des milliers de cadres et d'experts reconnus dans la sous-région.</li>
        </ul>
        <div className="text-center text-gray-500 text-sm">Université de Lomé - EPL &copy; {new Date().getFullYear()}</div>
      </div>
    </div>
  );
} 