'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';  

const professeurs = [
  {
    id: 'Alain-AGBLEZE',
    nom: 'Alain AGBLEZE',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
  {
    id: 'Koffi-AGBEKO',
    nom: 'Koffi AGBEKO',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
  {
    id: 'Justin-AGBEGNA',
    nom: 'Justin AGBEGNA',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
  {
    id: 'Justino-AGBEGNAE',
    nom: 'Justino AGBEGNAE',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
  {
    id: 'Justina-AGBEGNAO',
    nom: 'Justin AGBEGNA',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
  },
];

export default function Professeurs() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Docteur');

// A revoir 
    const filtered = professeurs.filter((prof) =>
    prof.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white to-blue-200 font-sans">
      <main className="flex-1 p-10">
        {/* Barre de filtres */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Docteur">Docteur</option>
            <option value="Professeur">Professeur</option>
          </select>

          <div className="flex items-center border rounded px-2 py-1 w-64">
            
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="🔍 Rechercher un professeur"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent flex-grow"
            />
          </div>
        </div>

        {/* Liste des professeurs */}
        <div className="space-y-6">
          {filtered.map((prof) => (
            // Lien vers la page dynamique avec l'id unique
            <Link
              key={prof.id}
              href={`/nos-profs/${prof.id}`}
              className="block bg-white shadow-md rounded-lg p-4 flex items-center gap-6 hover:bg-blue-100 transition"
            >
              <Image
                src={prof.image}
                alt={prof.nom}
                width={60}
                height={60}
                className="rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold">{prof.nom}</h3>
                <p className="text-gray-600">{prof.titre}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
