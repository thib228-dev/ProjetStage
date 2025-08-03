"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaClipboardList, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const courses = [
  { code: "INF 120", libelle: "Base de Données", credits: 4, parcours: "Licence", filiere: "Génie Logiciel" },
  { code: "INF 130", libelle: "Structure de données", credits: 4, parcours: "Licence", filiere: "Génie Logiciel" },
  { code: "INF 150", libelle: "Programmation Mobile", credits: 4, parcours: "Licence", filiere: "Réseaux" },
  { code: "INF 160", libelle: "Programmation Web", credits: 4, parcours: "Licence", filiere: "Génie Logiciel" },
  { code: "INF 170", libelle: "Programmation distribuée", credits: 4, parcours: "Licence", filiere: "Réseaux" },
];

export default function CoursProf() {
const router = useRouter();
const handleSaisirNotes = () => {
    router.push('/enseignant/dashboard/notes');
  };
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const filieresDisponibles = [...new Set(courses.map((c) => c.filiere))];

  const filteredCourses = selectedFiliere
    ? courses.filter((c) => c.filiere === selectedFiliere)
    : courses;

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1 text-gray-400" />;
    return sortConfig.direction === 'ascending' 
      ? <FaSortUp className="ml-1 text-orange-600" /> 
      : <FaSortDown className="ml-1 text-orange-600" />;
  };

  const handleRowClick = (course) => {
    setSelectedCourse(course.code === selectedCourse?.code ? null : course);
  };

  return (
    <div className="bg-transparent  backdrop-blur-md   px-8 py-10 w-full  animate-fade-in">
      {/* Titre avec année scolaire */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-orange-900">
          Cours enseignés
        </h1>
        <div className="text-sm font-medium text-gray-600">
          2023-2024 | Semestre 1
        </div>
      </div>

      {/* Filtre */}
      <div className="flex justify-between items-center mb-6 mt-10">
        <h2 className="flex items-center gap-3 text-lg font-semibold text-orange-900">
          <FaClipboardList className="text-orange-700" />
          <span>Filtrer par</span>
        </h2>
        <select
          value={selectedFiliere}
          onChange={(e) => setSelectedFiliere(e.target.value)}
          className="px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        >
          <option value="">Toutes les filières</option>
          {filieresDisponibles.map((filiere, idx) => (
            <option key={idx} value={filiere}>
              {filiere}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau professionnel avec tri */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-700">
              <th 
                className="px-4 py-3 border-b border-gray-200 bg-gray-50 cursor-pointer"
                onClick={() => requestSort('code')}
              >
                <div className="flex items-center">
                  Code UE
                  {getSortIcon('code')}
                </div>
              </th>
              <th 
                className="px-4 py-3 border-b border-gray-200 bg-gray-50 cursor-pointer"
                onClick={() => requestSort('libelle')}
              >
                <div className="flex items-center">
                  Libellé UE
                  {getSortIcon('libelle')}
                </div>
              </th>
              <th 
                className="px-4 py-3 border-b border-gray-200 bg-gray-50 cursor-pointer"
                onClick={() => requestSort('credits')}
              >
                <div className="flex items-center">
                  Crédit
                  {getSortIcon('credits')}
                </div>
              </th>
              <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  Parcours
                </div>
              </th>
              <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center">
                  Filière
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCourses.map((course, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-50 transition cursor-pointer ${
                  selectedCourse?.code === course.code ? 'bg-orange-50' : ''
                }`}
                onClick={() => handleRowClick(course)}
              >
                <td className="px-4 py-3 border-b border-gray-200 font-medium text-gray-900">
                  {course.code}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {course.libelle}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  {course.credits}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {course.parcours}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  {course.filiere}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Boutons séparés */}
      <div className="mt-8 flex justify-between">
        <button
          className={`${
            selectedCourse
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } font-semibold px-6 py-2 rounded-lg shadow transition`}
          disabled={!selectedCourse}
        >
          Informations sur l'UE
        </button>
        <button
        onClick={handleSaisirNotes}
          className={`${
            selectedCourse
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } font-semibold px-6 py-2 rounded-lg shadow transition`}
          disabled={!selectedCourse}
        >
          Saisir les notes
        </button>
      </div>
    </div>
  );
}