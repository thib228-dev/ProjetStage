import React from "react";
import { FaCheckCircle, FaChartBar, FaMedal, FaStar, FaTrophy } from "react-icons/fa";

export default function Statistiques() {
  return (
    <div className="bg-transparent backdrop-blur-2xl  shadow-1xl px-10 py-12 w-full animate-fade-in ">
      <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 mb-8 drop-shadow justify-center">
        <FaChartBar className="text-blue-700 text-3xl" /> Statistique personnelle
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-30">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-3xl text-blue-600 mb-1" />
          <span className="text-4xl font-extrabold text-blue-700">12</span>
          <span className="text-gray-500">UE validées</span>
        </div>
        <div className="flex flex-col items-center">
          <FaStar className="text-3xl text-green-600 mb-1" />
          <span className="text-4xl font-extrabold text-green-700">48</span>
          <span className="text-gray-500">Crédits obtenus</span>
        </div>
        <div className="flex flex-col items-center">
          <FaMedal className="text-3xl text-orange-500 mb-1" />
          <span className="text-4xl font-extrabold text-orange-500">14.7</span>
          <span className="text-gray-500">Moyenne générale</span>
        </div>
        <div className="flex flex-col items-center">
          <FaTrophy className="text-3xl text-purple-700 mb-1" />
          <span className="text-4xl font-extrabold text-purple-700">5<sup>e</sup></span>
          <span className="text-gray-500">Rang</span>
        </div>
      </div>
      <div className="mt-30">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: "80%" }}></div>
        </div>
        <div className=" text-right text-sm text-gray-500 mt-1">Progression : 80%</div>
      </div>
    </div>
  );
} 