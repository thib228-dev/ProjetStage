"use client";
import React, { useState } from "react";
import { ClipboardList, X, Save, Info } from "lucide-react";
import FiltreDropDown from "@/components/ui/FiltreDropDown";
import ExportButton from "@/components/ui/ExportButton";

export default function NotesASaisirProf() {
  // Données des étudiants
  const [students, setStudents] = useState([
    { matricule: "114587", nom: "AKAKPO", prenom: "Koffi Eli", parcours: "Lpro-Gl", note: "11" },
    { matricule: "114587", nom: "AKAKPO", prenom: "Koffi Eli", parcours: "Lpro-Gl", note: "11" },
    { matricule: "114587", nom: "AKAKPO", prenom: "Koffi Eli", parcours: "Lpro-sri", note: "11" },
    { matricule: "114587", nom: "AKAKPO", prenom: "Koffi Eli", parcours: "Lpro-sri", note: "11" },
  ]);

  // États pour les filtres
  const [filiere, setFiliere] = useState("");
  const [parcours, setParcours] = useState("");

  // Options pour les filtres
  const filieres = ["Génie Logiciel", "Réseaux", "Data Science"];
  const parcoursOptions = ["Lpro-Gl", "Lpro-sri", "Master"];

  const getParcoursColor = (parcours) => {
    switch (parcours) {
      case 'Lpro-Gl':
        return 'bg-green-100 text-green-800';
      case 'Lpro-sri':
        return 'bg-purple-100 text-purple-800';
      case 'Master':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ClipboardList className="text-orange-600 h-8 w-8" />
            Exercice
          </h1>
          <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
            2023-2024 | Semestre 1
          </div>
        </div>
        
        <div className="flex gap-4">
          <FiltreDropDown
            label="Filière"
            options={filieres}
            selectedValue={filiere}
            onValueChange={setFiliere}
          />
          <FiltreDropDown
            label="Parcours"
            options={parcoursOptions}
            selectedValue={parcours}
            onValueChange={setParcours}
          />
          <ExportButton 
            data={students} 
            filename="exercice_notes"
          />
        </div>
      </div>

      {/* Table Container - Takes remaining space */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full h-full bg-white">
          <div className="overflow-auto h-full">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Matricule
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Prénoms
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Parcours
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 transition-all duration-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {student.matricule}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {student.nom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.prenom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getParcoursColor(student.parcours)}`}>
                        {student.parcours}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="text"
                        value={student.note}
                        onChange={(e) => {
                          const newStudents = [...students];
                          newStudents[index].note = e.target.value;
                          setStudents(newStudents);
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center text-sm font-semibold bg-white shadow-sm transition-all duration-200"
                        placeholder="--"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-gray-200 px-8 py-6 shadow-sm">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200 shadow-sm border border-gray-300">
            <X className="h-4 w-4" />
            Annuler
          </button>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white hover:bg-orange-700 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
              <Save className="h-4 w-4" />
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}