import React, { useState } from "react";
import { FaProjectDiagram, FaEdit, FaSave, FaTimes, FaTrash, FaPlus } from "react-icons/fa";

const initialProjets = [
  { id: 1, titre: "Application mobile EPL", etudiants: "A. Sandrine, K. Komi", annee: "2023" },
  { id: 2, titre: "Site web EPL", etudiants: "B. Yao, M. Akouvi", annee: "2022" },
];

export default function ProjetsEncadresProf() {
  const [projets, setProjets] = useState(initialProjets);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editProjet, setEditProjet] = useState({ titre: "", etudiants: "", annee: "" });
  const [adding, setAdding] = useState(false);

  // Filtrer projets par titre ou étudiants
  const filteredProjets = projets.filter(
    (p) =>
      p.titre.toLowerCase().includes(search.toLowerCase()) ||
      p.etudiants.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (projet) => {
    setEditingId(projet.id);
    setEditProjet({ ...projet });
    setAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setAdding(false);
    setEditProjet({ titre: "", etudiants: "", annee: "" });
  };

  const handleSave = () => {
    if (!editProjet.titre || !editProjet.etudiants || !editProjet.annee) {
      alert("Merci de remplir tous les champs (titre, étudiants, année).");
      return;
    }

    if (adding) {
      const newProjet = {
        ...editProjet,
        id: projets.length > 0 ? Math.max(...projets.map(p => p.id)) + 1 : 1,
      };
      setProjets([...projets, newProjet]);
    } else {
      setProjets(projets.map(p => (p.id === editingId ? { ...editProjet, id: editingId } : p)));
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      setProjets(projets.filter(p => p.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProjet(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-transparent backdrop-blur-md px-8 py-10 w-full animate-fade-in max-w-5xl mx-auto">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900 mb-6">
        <FaProjectDiagram className="text-blue-700" /> Projets encadrés
      </h2>

      {/* Recherche + bouton ajout */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Rechercher par titre ou étudiants"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
        <button
          onClick={() => {
            setAdding(true);
            setEditingId(null);
            setEditProjet({ titre: "", etudiants: "", annee: "" });
          }}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          <FaPlus /> Ajouter un projet
        </button>
      </div>

      {/* Formulaire ajout / édition */}
      {(adding || editingId !== null) && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
          className="mb-6 bg-white p-6 rounded shadow"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="titre"
              placeholder="Titre du projet"
              value={editProjet.titre}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="text"
              name="etudiants"
              placeholder="Étudiants encadrés"
              value={editProjet.etudiants}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="number"
              name="annee"
              placeholder="Année"
              value={editProjet.annee}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition flex items-center gap-2"
            >
              <FaSave /> {adding ? "Ajouter" : "Enregistrer"}
            </button>
          </div>
        </form>
      )}

      {/* Tableau projets */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left text-blue-900 bg-blue-100">
              <th className="px-3 py-2">Titre</th>
              <th className="px-3 py-2">Étudiants</th>
              <th className="px-3 py-2">Année</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjets.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Aucun projet trouvé.
                </td>
              </tr>
            ) : (
              filteredProjets.map(p => (
                <tr key={p.id} className="bg-white/70 hover:bg-blue-50 transition rounded-xl shadow">
                  <td className="px-3 py-2 font-semibold text-blue-900">{p.titre}</td>
                  <td className="px-3 py-2">{p.etudiants}</td>
                  <td className="px-3 py-2">{p.annee}</td>
                  <td className="px-3 py-2 flex gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Supprimer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
