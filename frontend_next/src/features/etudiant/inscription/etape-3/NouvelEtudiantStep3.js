import React from "react";

export default function NouvelEtudiantStep3({onSubmit}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        {/* Étapes d'inscription */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex flex-col items-center ${step === 3 ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === 3 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'} font-bold text-lg transition-all`}>{step}</div>
              {step < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>
        {/* Formulaire */}
        <form onSubmit={onSubmit}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-lg flex flex-col gap-8 animate-fade-in">
          {/* Parcours */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Parcours</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70">
              <option value="">Sélectionnez le parcours</option>
              <option value="Licence">Licence</option>
              <option value="Licence Pro">Licence Professionnelle</option>
              <option value="Master">Master</option>
            </select>
          </div>
          {/* Filière */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Filière</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70">
              <option value="">Sélectionnez la filière</option>
              <option value="Génie Logiciel">Génie Logiciel</option>
              <option value="Génie Informatique">Génie Informatique</option>
              <option value="Génie Civil">Génie Civil</option>
              <option value="Génie Electrique">Génie Electrique</option>
              <option value="Génie Mécanique">Génie Mécanique</option>
            </select>
          </div>
          {/* Année */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Année</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70">
              <option value="">Sélectionnez l'année</option>
              <option value="Licence 1">Licence 1</option>
              <option value="Licence 2">Licence 2</option>
              <option value="Licence 3">Licence 3</option>
              <option value="Master 1">Master 1</option>
              <option value="Master 2">Master 2</option>
            </select>
          </div>
          <div className="flex justify-between mt-6 gap-4">
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full shadow transition-all">Annuler</button>
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8 rounded-full shadow transition-all">Suivant</button>
          </div>
        </form>
      </main>
    </div>
  );
} 