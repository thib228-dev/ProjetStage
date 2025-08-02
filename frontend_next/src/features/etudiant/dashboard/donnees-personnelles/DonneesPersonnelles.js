import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaGraduationCap, FaBook, FaCalendarAlt } from "react-icons/fa";

export default function DonneesPersonnelles() {
  return (
    <div className="bg-transparent backdrop-blur-2xl  shadow-1xl px-10 py-12 w-full animate-fade-in ">
      <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 mb-8 drop-shadow ">
        <FaUser className="text-blue-700 text-3xl " /> Mes données personnelles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
        <div className="flex items-center gap-2">
          <FaUser className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Nom</div>
            <div className="font-bold text-lg text-blue-900">EKOUÉ</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaUser className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Prénom</div>
            <div className="font-bold text-lg text-blue-900">Afi Sandrine</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Date de naissance</div>
            <div className="font-bold text-lg text-blue-900">20-03-2004</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Email</div>
            <div className="font-bold text-lg text-blue-900">afi.sandrine@epl.tg</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Contact</div>
            <div className="font-bold text-lg text-blue-900">+228 90 00 00 00</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Adresse</div>
            <div className="font-bold text-lg text-blue-900">Lomé, Togo</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaVenusMars className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Sexe</div>
            <div className="font-bold text-lg text-blue-900">Féminin</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Parcours</div>
            <div className="font-bold text-lg text-blue-900">Licence professionnelle</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaBook className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Filière</div>
            <div className="font-bold text-lg text-blue-900">Génie logiciel</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-blue-500" />
          <div>
            <div className="text-gray-500 text-sm">Année</div>
            <div className="font-bold text-lg text-blue-900">Licence 3</div>
          </div>
        </div>
      </div>
    </div>
  );
} 