import React from "react";

export default function Programmes() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans px-4 py-12">
      <div className="bg-white/0 backdrop-blur-md   px-8 py-20 w-full max-w-10xl animate-fade-in">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">Nos Programmes</h1>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-center">
          <li><span className="font-bold">Licence en Génie Logiciel</span> : 3 ans, formation en développement logiciel, algorithmique, bases de données, etc.</li>
          <li><span className="font-bold">Licence en Génie Informatique</span> : 3 ans, réseaux, systèmes, sécurité informatique.</li>
          <li><span className="font-bold">Licence en Génie Civil</span> : 3 ans, structures, matériaux, chantiers.</li>
          <li><span className="font-bold">Licence en Génie Electrique</span> : 3 ans, électricité, électronique, automatismes.</li>
          <li><span className="font-bold">Master en Informatique</span> : 2 ans, spécialisation avancée, recherche, projets innovants.</li>
          <li><span className="font-bold">Master en Génie Civil</span> : 2 ans, ingénierie avancée, gestion de projets, innovation.</li>
        </ul>
        <div className="text-center text-gray-500 text-sm">Université de Lomé - EPL &copy; {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}
