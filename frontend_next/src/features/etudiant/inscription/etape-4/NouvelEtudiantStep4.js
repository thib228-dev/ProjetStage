import React from "react";

const ues = [
  { code: "INF 130", libelle: "Structure de données", credits: 4 },
  { code: "INF 140", libelle: "Analyse Numérique", credits: 3 },
  { code: "INF 150", libelle: "Programmation Mobile", credits: 4 },
  { code: "INF 160", libelle: "Programmation Web", credits: 4 },
  { code: "INF 170", libelle: "Programmation distribuée", credits: 4 },
  { code: "INF 180", libelle: "Théorie des Graphes", credits: 4 },
  { code: "INF 230", libelle: "Structure de données", credits: 4 },
  { code: "INF 240", libelle: "Analyse Numérique", credits: 3 },
  { code: "INF 250", libelle: "Programmation Mobile", credits: 4 },
  { code: "INF 260", libelle: "Programmation Web", credits: 4 },
  { code: "INF 270", libelle: "Programmation distribuée", credits: 4 },
  { code: "INF 280", libelle: "Théorie des Graphes", credits: 4 },
];

export default function NouvelEtudiantStep4({onSubmit}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        {/* Étapes d'inscription */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex flex-col items-center ${step === 4 ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === 4 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'} font-bold text-lg transition-all`}>{step}</div>
              {step < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>
        {/* Tableau des UE */}
        <form onSubmit={onSubmit}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-6 py-8 w-full max-w-3xl flex flex-col gap-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Choisissez vos UE à valider</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-blue-800">
                  <th className="px-3 py-2">Valider</th>
                  <th className="px-3 py-2">Code</th>
                  <th className="px-3 py-2">Libellé</th>
                  <th className="px-3 py-2">Crédits</th>
                </tr>
              </thead>
              <tbody>
                {ues.map((ue, idx) => (
                  <tr key={ue.code} className="bg-white/70 hover:bg-blue-50 transition rounded-xl shadow">
                    <td className="px-3 py-2">
                      <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 rounded" />
                    </td>
                    <td className="px-3 py-2 font-semibold text-blue-900">{ue.code}</td>
                    <td className="px-3 py-2">{ue.libelle}</td>
                    <td className="px-3 py-2 text-center">{ue.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-6 gap-4">
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full shadow transition-all">Annuler</button>
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-full shadow transition-all">Enregistrer</button>
          </div>
        </form>
      </main>
    </div>
  );
} 