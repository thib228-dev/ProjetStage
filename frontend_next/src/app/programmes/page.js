import React from "react";

/* export default function Programmes() {
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
} */


  import { GraduationCap, Laptop, Building2, Zap } from "lucide-react";

export default function Programmes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-16 flex flex-col items-center">
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Nos Programmes</h1>
        <p className="text-gray-600 text-lg">
          Découvrez nos formations d’excellence, alliant théorie et pratique, dans divers domaines du génie.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Licence */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-500" />
            Licences Professionnelles
          </h2>
          <ul className="text-gray-700 space-y-3 text-left">
            <li>
              <span className="font-semibold text-blue-700">Génie Logiciel</span> – 3 ans : développement logiciel, algorithmique, bases de données.
            </li>
            <li>
              <span className="font-semibold text-blue-700">Génie Informatique</span> – 3 ans : réseaux, systèmes, sécurité informatique.
            </li>
            <li>
              <span className="font-semibold text-blue-700">Génie Civil</span> – 3 ans : structures, matériaux, chantiers.
            </li>
            <li>
              <span className="font-semibold text-blue-700">Génie Électrique</span> – 3 ans : électricité, électronique, automatismes.
            </li>
          </ul>
        </div>

        {/* Master */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <Laptop className="w-6 h-6 text-blue-500" />
            Masters Professionnels
          </h2>
          <ul className="text-gray-700 space-y-3 text-left">
            <li>
              <span className="font-semibold text-blue-700">Informatique</span> – 2 ans : spécialisation avancée, recherche, projets innovants.
            </li>
            <li>
              <span className="font-semibold text-blue-700">Génie Civil</span> – 2 ans : ingénierie avancée, gestion de projets, innovation.
            </li>
          </ul>
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        Université de Lomé – EPL &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
