"use client";
import React, { useEffect, useState } from "react";
import { loginAndGetNotes } from "../../../../services/noteService";

export default function NotesTable() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const mot_de_passe = localStorage.getItem("mot_de_passe");

    if (!email || !mot_de_passe) {
      console.error("Identifiants manquants pour récupérer les notes");
      setLoading(false);
      return;
    }

    loginAndGetNotes(email, mot_de_passe)
      .then((data) => {
        setNotes(data.notes || []);
      })
      .catch((err) => {
        console.error("Erreur récupération des notes :", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        <span className="ml-4 text-blue-700 font-semibold">Chargement des notes...</span>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">
        Tableau d'affichage des notes
      </h1>

      {notes.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <tr>
                {["ID UE", "Nom UE", "Session", "Semestre", "Note"].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {notes.map((note, idx) => (
                <tr
                  key={note.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.ueId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{note.ueNom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{note.session}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{note.semestre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-700">{note.valeur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-12">
          Aucune note disponible pour l'instant.
        </p>
      )}
    </div>
  );
}
