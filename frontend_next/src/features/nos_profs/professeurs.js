'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import ProfesseurService from '@/services/profService';

export default function Professeurs() {
  const [professeurs, setProfesseurs] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Docteur');

  // Charger tous les professeurs
  useEffect(() => {
    ProfesseurService.getAllProfesseurs()
      .then((data) => setProfesseurs(data))
      .catch((err) => console.error(err));
  }, []);

  // Filtrage par nom et rôle
  const filtered = professeurs.filter(
    (prof) =>
      prof.utilisateur.last_name.toLowerCase().includes(search.toLowerCase()) &&
      prof.titre === roleFilter
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white to-blue-200 font-sans">
      <main className="flex-1 p-10">
        {/* Barre de filtres */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="Docteur">Docteur</option>
            <option value="Professeur">Professeur</option>
          </select>

          <div className="flex items-center border rounded px-2 py-1 w-full max-w-md">
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
          {filtered.length === 0 && (
            <p className="text-gray-600 text-center">Aucun professeur trouvé.</p>
          )}

          {filtered.map((prof) => (
            <Link
              key={prof.id}
              href={`/nos-profs/${prof.id}`} // Page dynamique [id]/page.jsx
              className="block bg-white shadow-md rounded-lg p-4 flex items-center gap-6 hover:bg-blue-100 transition"
            >
              <Image
                src={prof.photo || '/default-avatar.png'}
                alt={`${prof.utilisateur.first_name} ${prof.utilisateur.last_name}`}
                width={60}
                height={60}
                className="rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-bold">
                  {prof.utilisateur.last_name} {prof.utilisateur.first_name}
                </h3>
                <p className="text-gray-600">{prof.titre}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
