import React from "react";
import Link from "next/link";

export default function NouvelEtudiantStep1({ onSubmit }) {
  return (
    <div className=" bg-gradient-to-b from-white to-blue-200 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
      {/* retour*/}
        <div className="w-full max-w-lg mb-6 self-start px-2">
          <Link href="/" className="text-blue-700 font-semibold hover:underline">
             Retour à l’accueil
          </Link>
        </div>
        {/* Étapes d'inscription */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex flex-col items-center ${step === 1 ? 'text-blue-700' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === 1 ? 'border-blue-700 bg-blue-100' : 'border-gray-300 bg-white'} font-bold text-lg transition-all`}>{step}</div>
              {step < 4 && <div className="w-12 h-1 bg-gray-300 mt-1 mb-1 rounded" />}
            </div>
          ))}
        </div>
        {/* Formulaire */}
      
        <form   onSubmit={onSubmit}
        className="bg-transparent backdrop-blur-md px-8 py-10 w-full max-w-lg flex flex-col gap-6 animate-fade-in">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nom</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-black-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="Entrez votre nom" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Prénom</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-black-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="Entrez votre prénom" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border border-black-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="exemple@email.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contact</label>
            <input type="tel" className="w-full px-4 py-2 rounded-lg border border-black-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" placeholder="Numéro de téléphone" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date de naissance</label>
            <input type="date" className="w-full px-4 py-2 rounded-lg border border-black-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70" />
          </div>
          <div className="flex justify-between mt-6 gap-4">
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8  shadow transition-all">Annuler</button>
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-8  shadow transition-all">Suivant</button>
          </div>
        </form>
      </main>
    </div>
  );
} 