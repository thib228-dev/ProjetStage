import React, { useState } from "react";
import { FaUsers, FaEdit, FaSave, FaTimes, FaTrash, FaPlus } from "react-icons/fa";

const initialEncadrements = [
  { id: 1, etudiant: "A. Sandrine", sujet: "App mobile EPL", annee: "2023", statut: "En cours" },
  { id: 2, etudiant: "B. Yao", sujet: "Site web EPL", annee: "2022", statut: "Terminé" },
];

export default function EncadrementsProf() {
  const [encadrements, setEncadrements] = useState(initialEncadrements);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editEncadrement, setEditEncadrement] = useState({ etudiant: "", sujet: "", annee: "", statut: "En cours" });
  const [adding, setAdding] = useState(false);

  // Filtrer selon étudiant ou sujet
  const filteredEncadrements = encadrements.filter(
    (e) =>
      e.etudiant.toLowerCase().includes(search.toLowerCase()) ||
      e.sujet.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (encadrement) => {
    setEditingId(encadrement.id);
    setEditEncadrement({ ...encadrement });
    setAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setAdding(false);
    setEditEncadrement({ etudiant: "", sujet: "", annee: "", statut: "En cours" });
  };

  const handleSave = () => {
    if (!editEncadrement.etudiant || !editEncadrement.sujet || !editEncadrement.annee || !editEncadrement.statut) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    if (adding) {
      const newEncadrement = {
        ...editEncadrement,
        id: encadrements.length > 0 ? Math.max(...encadrements.map(e => e.id)) + 1 : 1,
      };
      setEncadrements([...encadrements, newEncadrement]);
    } else {
      setEncadrements(encadrements.map(e => (e.id === editingId ? { ...editEncadrement, id: editingId } : e)));
    }
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet encadrement ?")) {
      setEncadrements(encadrements.filter(e => e.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEncadrement(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-transparent backdrop-blur-md px-8 py-10 w-full animate-fade-in max-w-5xl mx-auto">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900 mb-6">
        <FaUsers className="text-blue-700" /> Encadrements
      </h2>

      {/* Recherche + bouton ajout */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Rechercher par étudiant ou sujet"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
        <button
          onClick={() => {
            setAdding(true);
            setEditingId(null);
            setEditEncadrement({ etudiant: "", sujet: "", annee: "", statut: "En cours" });
          }}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          <FaPlus /> Ajouter un encadrement
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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              name="etudiant"
              placeholder="Nom de l'étudiant"
              value={editEncadrement.etudiant}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="text"
              name="sujet"
              placeholder="Sujet de l'encadrement"
              value={editEncadrement.sujet}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              type="number"
              name="annee"
              placeholder="Année"
              value={editEncadrement.annee}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <select
              name="statut"
              value={editEncadrement.statut}
              onChange={handleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            >
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
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

      {/* Tableau encadrements */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left text-blue-900 bg-blue-100">
              <th className="px-3 py-2">Étudiant</th>
              <th className="px-3 py-2">Sujet</th>
              <th className="px-3 py-2">Année</th>
              <th className="px-3 py-2">Statut</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEncadrements.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Aucun encadrement trouvé.
                </td>
              </tr>
            ) : (
              filteredEncadrements.map((e) => (
                <tr key={e.id} className="bg-white/70 hover:bg-blue-50 transition rounded-xl shadow">
                  <td className="px-3 py-2 font-semibold text-blue-900">{e.etudiant}</td>
                  <td className="px-3 py-2">{e.sujet}</td>
                  <td className="px-3 py-2">{e.annee}</td>
                  <td className={"px-3 py-2 font-bold " + (e.statut === "Terminé" ? "text-green-700" : "text-orange-600")}>{e.statut}</td>
                  <td className="px-3 py-2 flex gap-3">
                    <button
                      onClick={() => handleEdit(e)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
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
