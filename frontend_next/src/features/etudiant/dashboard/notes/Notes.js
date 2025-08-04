"use client";
import React, { useState } from "react";
import TableauEditable from "@/components/ui/TableauReutilisable.js";

export default function Notes() {
  const colonnes = ["Nom", "Note Devoir", "Note Examen", "Total Pondéré"];
  const [donnees, setDonnees] = useState([
    { nom: "Alice", note_devoir: 12, note_examen: 14, total_pondere: 13 },
    { nom: "Bob", note_devoir: 8, note_examen: 10, total_pondere: 9 },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [evaluation, setEvaluation] = useState("Examen"); // ou "Devoir"

  const handleEditChange = (index, field, value) => {
    const newDonnees = [...donnees];
    newDonnees[index][field] = value;
    setDonnees(newDonnees);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Saisie des Notes</h2>

      <TableauEditable
        colonnes={colonnes}
        donnees={donnees}
        evaluation={evaluation}
        editIndex={editIndex}
        onEditChange={handleEditChange}
      />

      <button
        onClick={() => setEditIndex(0)}
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded"
      >
        Modifier 1ère ligne
      </button>
    </div>
  );
}
