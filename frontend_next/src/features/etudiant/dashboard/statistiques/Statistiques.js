"use client";
import React from "react";
import {
  FaCheckCircle,
  FaChartBar,
  FaMedal,
  FaStar,
  FaTrophy
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Statistiques() {
  // Exemple de données — à remplacer par ton fetch API plus tard
  const data = [
    { semestre: "S1", moyenne: 12.5 },
    { semestre: "S2", moyenne: 13.8 },
    { semestre: "S3", moyenne: 14.2 },
    { semestre: "S4", moyenne: 15.0 },
    { semestre: "S5", moyenne: 14.7 },
    { semestre: "S6", moyenne: 15.3 },
  ];

  return (
    <div className="bg-transparent backdrop-blur-2xl shadow-1xl px-10 py-12 w-full animate-fade-in">
      {/* Titre */}
      <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 mb-8 drop-shadow justify-center">
        <FaChartBar className="text-blue-700 text-3xl" /> Statistique personnelle
      </h2>

      {/* Cartes principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
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
          <span className="text-4xl font-extrabold text-purple-700">
            5<sup>e</sup>
          </span>
          <span className="text-gray-500">Rang</span>
        </div>
      </div>

      {/* Graphique + liste moyennes */}
      <div className="mt-12 bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          Évolution de la moyenne par semestre
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semestre" />
            <YAxis domain={[0, 20]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="moyenne"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Liste des moyennes */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-blue-50 rounded-lg p-3 shadow-sm"
            >
              <span className="text-sm text-gray-500">{item.semestre}</span>
              <span className="text-xl font-bold text-blue-700">
                {item.moyenne.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mt-10">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">
          Progression : 80%
        </div>
      </div>
    </div>
  );
}
