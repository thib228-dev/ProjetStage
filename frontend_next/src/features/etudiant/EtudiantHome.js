import React from "react";
import Link from "next/link";

export default function EtudiantHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-2xl mb-2 flex justify-start">
          <Link href="/" className="text-blue-600 text-sm hover:underline flex items-center gap-1 group">
            <svg className="w-4 h-4 text-blue-500 group-hover:text-blue-700 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Retour à l'accueil
          </Link>
        </div>
        <h2 className="text-4xl font-extrabold text-blue-900 mb-6 tracking-tight drop-shadow">Bienvenue</h2>
        <div className="bg-yellow-50/80 border-l-4 border-yellow-400 text-yellow-900 px-8 py-5 rounded-xl mb-12 max-w-xl w-full text-lg font-medium shadow-lg flex items-center gap-4 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-yellow-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          <span>
            Les inscriptions pour le compte de l'année académique <span className="font-bold">2023 - 2024</span> sont ouvertes pour la période du <span className="font-bold">27 novembre 2023</span> au <span className="font-bold">09 décembre 2023</span>.
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 w-full max-w-2xl justify-center">
          <Link href="/etudiant/connexion" className="flex-1 flex flex-col items-center justify-center bg-white/80 border border-blue-100 rounded-2xl shadow-xl py-10 px-4 hover:scale-105 hover:shadow-2xl transition-all group backdrop-blur-md cursor-pointer">
            <span className="bg-blue-100 text-blue-700 rounded-full p-4 text-4xl shadow group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-10 h-10'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
            </span>
            <span className="text-2xl font-semibold text-blue-900 mt-4">Ancien Étudiant</span>
          </Link>
          <Link href="/etudiant/inscription" className="flex-1 flex flex-col items-center justify-center bg-white/80 border border-orange-100 rounded-2xl shadow-xl py-10 px-4 hover:scale-105 hover:shadow-2xl transition-all group backdrop-blur-md cursor-pointer">
            <span className="bg-orange-100 text-orange-700 rounded-full p-4 text-4xl shadow group-hover:bg-orange-500 group-hover:text-white transition-all">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-10 h-10'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm-6 8v-1a4 4 0 014-4h4a4 4 0 014 4v1' /></svg>
            </span>
            <span className="text-2xl font-semibold text-orange-900 mt-4">Nouvel Étudiant</span>
          </Link>
        </div>
      </main>
      <footer className="text-xs text-gray-500 text-right px-8 pb-2 mt-8">&copy; EPL - Université de Lomé {new Date().getFullYear()}</footer>
    </div>
  );
} 