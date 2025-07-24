import React from "react";
import { FaUser } from "react-icons/fa";

export default function DonneesPersonnellesProf() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-8 py-10 w-full max-w-2xl animate-fade-in">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-orange-900 mb-6">
        <FaUser className="text-orange-700" /> Mes données personnelles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="text-gray-500 text-sm">Nom</div>
          <div className="font-bold text-lg text-orange-900">Kossi</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Prénom</div>
          <div className="font-bold text-lg text-orange-900">Kodjo</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Email</div>
          <div className="font-bold text-lg text-orange-900">k.kodjo@epl.tg</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Contact</div>
          <div className="font-bold text-lg text-orange-900">+228 90 11 22 33</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Adresse</div>
          <div className="font-bold text-lg text-orange-900">Lomé, Togo</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Sexe</div>
          <div className="font-bold text-lg text-orange-900">Masculin</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Spécialité</div>
          <div className="font-bold text-lg text-orange-900">Programmation Web</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Grade</div>
          <div className="font-bold text-lg text-orange-900">Maître de Conférences</div>
        </div>
      </div>
    </div>
  );
} 