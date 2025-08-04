'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

const professeurs = [
  {
    nom: 'Alain AGBLEZE',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',

  },
  {
    nom: 'Koffi AGBEKO',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
  {
    nom: 'Justin AGBEGNA',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
];

export default function Professeurs() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Docteur');

  const filtered = professeurs.filter((prof) =>
    prof.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white to-blue-200 font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md px-4 py-6 flex flex-col justify-between ">
        <div className="space-y-4">

          <div className="space-y-4 text-gray-700 font-semibold mt-15">
            <div className="hover:text-blue-600 cursor-pointer mt-10 ml-7">Profil</div>
            <div className="hover:text-blue-600 cursor-pointer mt-10 ml-7">Cours</div>
            <div className="hover:text-blue-600 cursor-pointer mt-10 ml-7">Articles</div>
            <div className="hover:text-blue-600 cursor-pointer mt-10 ml-7">Projets</div>
            <div className="hover:text-blue-600 cursor-pointer mt-10 ml-7">Encadrements</div>
            <div className="hover:text-blue-600 cursor-pointer mt-10 ml-7">Contact</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-8">&copy;Copyright. Août 2025</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        {/* Filtres */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Docteur">Docteur</option>
            <option value="Professeur">Professeur</option>
          </select>

          <div className="flex items-center border rounded px-2 py-1">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="🔍 AGB"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Liste des professeurs */}
        <div className="space-y-6">
          {filtered.map((prof, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex items-center gap-6"
            >
              <Image
                src={prof.image}
                alt={prof.nom}
                width={64}
                height={64}
                className="rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold">{prof.nom}</h3>
                <p className="text-gray-600">{prof.titre}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
