import React from "react";

export default function EnSavoirPlus() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans px-4 py-12">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-2xl animate-fade-in">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">En savoir plus sur l'EPL</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">Découvrez l'offre de formation, les débouchés, la vie étudiante et les atouts de l'École Polytechnique de Lomé.</p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li><span className="font-bold">Formations :</span> Ingénierie, informatique, génie civil, génie électrique, etc.</li>
          <li><span className="font-bold">Débouchés :</span> Entreprises, recherche, entrepreneuriat, secteur public et privé.</li>
          <li><span className="font-bold">Vie à l'EPL :</span> Campus moderne, clubs étudiants, événements scientifiques, accompagnement personnalisé.</li>
          <li><span className="font-bold">Atouts :</span> Corps enseignant qualifié, partenariats internationaux, stages et insertion professionnelle.</li>
        </ul>
        <div className="text-center text-gray-500 text-sm">Université de Lomé - EPL &copy; {new Date().getFullYear()}</div>
      </div>
    </div>
  );
} 