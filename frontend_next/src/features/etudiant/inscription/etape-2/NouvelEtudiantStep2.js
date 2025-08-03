import React from "react";

export default function NouvelEtudiantStep2({onSubmit}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        {/* Étapes d'inscription */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex flex-col items-center ${step === 2 ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === 2 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'} font-bold text-lg transition-all`}>{step}</div>
              {step < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>
        {/* Formulaire */}
        <form onSubmit={onSubmit}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-lg flex flex-col gap-8 animate-fade-in">
          {/* Upload photo */}
          <div className="flex flex-col items-center gap-2">
            <label className="block text-gray-700 font-semibold mb-2">Photo de profil</label>
            <div className="relative w-32 h-32 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center overflow-hidden mb-2">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.25a8.25 8.25 0 1115 0v.25a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-.25z" /></svg>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow"><svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2-2l-6 6" /></svg></span>
            </div>
            <span className="text-xs text-gray-400">Format accepté : JPG, PNG, max 2Mo</span>
          </div>
          {/* Sexe */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Sexe</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70">
              <option value="">Sélectionnez</option>
              <option value="Féminin">Féminin</option>
              <option value="Masculin">Masculin</option>
            </select>
          </div>
          {/* Adresse */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Adresse</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="Votre adresse" />
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