"use client";

import React, { useState } from "react";
import ExportButton from "@/components/ui/ExportButton";
import { FaFileExport } from "react-icons/fa";

export default function SaisieNotes() {
  // Données des étudiants selon votre maquette
  const [students] = useState([
    {
      matricule: "114587",
      nom: "AKAKPO",
      prenoms: "Koffi Eli",
      parcours: "Lpro-Gl",
      note: "04"
    },
    {
      matricule: "114587",
      nom: "AKAKPO",
      prenoms: "Koffi Eli",
      parcours: "Lpro-Gl",
      note: "04"
    },
    {
      matricule: "114587",
      nom: "AKAKPO",
      prenoms: "Koffi Eli",
      parcours: "Lpro-sri",
      note: "04"
    },
    {
      matricule: "114587",
      nom: "AKAKPO",
      prenoms: "Koffi Eli",
      parcours: "Lpro-sri",
      note: "04"
    },
    {
      matricule: "114587",
      nom: "AKAKPO",
      prenoms: "Koffi Eli",
      parcours: "Lpro-Gl",
      note: "04"
    }
  ]);

  const [notes, setNotes] = useState(students.reduce((acc, student, index) => {
    acc[index] = student.note;
    return acc;
  }, {}));

  const [errors, setErrors] = useState({});
  const [evaluationType, setEvaluationType] = useState("examen");
  const [ueName, setUeName] = useState("Algorithmique Avancée");
  const [parcours, setParcours] = useState("Lpro-Gl");

  const handleNoteChange = (index, value) => {
    // Validation 0-20
    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      setErrors(prev => ({ ...prev, [index]: "Valeur numérique requise" }));
      return;
    }
    
    if (numericValue < 0 || numericValue > 20) {
      setErrors(prev => ({ ...prev, [index]: "Doit être entre 0 et 20" }));
      return;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });

    setNotes(prev => ({ ...prev, [index]: value }));
  };

  const handleSave = () => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      alert("Veuillez corriger les erreurs avant d'enregistrer");
      return;
    }
    
    const updatedStudents = students.map((student, index) => ({
      ...student,
      note: notes[index] || student.note
    }));
    
    console.log("Données enregistrées:", {
      ue: ueName,
      parcours,
      type_evaluation: evaluationType,
      notes: updatedStudents
    });
    alert("Notes enregistrées avec succès");
  };

  // Données pour l'export
  const exportData = students.map((student, index) => ({
    Matricule: student.matricule,
    Nom: student.nom,
    Prénoms: student.prenoms,
    Parcours: student.parcours,
    Note: notes[index] || student.note,
    "Type d'évaluation": evaluationType,
    UE: ueName
  }));

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Saisie de notes</h1>
        <ExportButton 
          data={exportData} 
          filename={`notes_${ueName.replace(/\s+/g, '_')}`}
          className="ml-4"
        />
      </div>

      {/* Sélecteurs UE et Parcours */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">UE</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={ueName}
            onChange={(e) => setUeName(e.target.value)}
          >
            <option value="Algorithmique Avancée">Algorithmique Avancée</option>
            <option value="Base de Données">Base de Données</option>
            <option value="Programmation Web">Programmation Web</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Parcours/Filière</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={parcours}
            onChange={(e) => setParcours(e.target.value)}
          >
            <option value="Lpro-Gl">Lpro-Gl</option>
            <option value="Lpro-sri">Lpro-sri</option>
            <option value="Lpro-Gc">Lpro-rt</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type d'évaluation</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={evaluationType}
            onChange={(e) => setEvaluationType(e.target.value)}
          >
            <option value="examen">Examen</option>
            <option value="devoir">Devoir</option>
            <option value="projet">Projet</option>
            <option value="tp">Travaux Pratiques</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénoms</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.matricule}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.prenoms}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.parcours}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    className={`w-16 px-2 py-1 border rounded ${
                      errors[index] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={notes[index] || ""}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                  />
                  {errors[index] && (
                    <p className="text-xs text-red-500 mt-1">{errors[index]}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
          Annuler
        </button>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Enregistrer
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">
            Infos de l'UE
          </button>
        </div>
      </div>
    </div>
  );
}































































