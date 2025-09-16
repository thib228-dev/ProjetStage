"use client";

import React, { useState, useEffect } from "react";
import { CirclePlus, PencilLine, Trash2, AlertCircle } from "lucide-react";
import PeriodeSaisieService from "@/services/periodeSaisieService";

export default function PeriodeSaisie() {
  const [periodes, setPeriodes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPeriode, setEditingPeriode] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    numero: "",
    date_debut: "",
    date_fin: "",
  });

  // Charger les périodes depuis le backend
  const fetchPeriodes = async () => {
    try {
      const data = await PeriodeSaisieService.getAll();
      setPeriodes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des périodes :", error);
    }
  };

  useEffect(() => {
    fetchPeriodes();
  }, []);

  // Gérer les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sauvegarde (création ou mise à jour)
  const handleSave = async () => {
    setError("");

    // Vérification des dates
    if (formData.date_debut >= formData.date_fin) {
      setError("La date de fin doit être postérieure à la date de début.");
      return;
    }

    try {
      if (editingPeriode) {
        await PeriodeSaisieService.update(editingPeriode.id, formData);
      } else {
        await PeriodeSaisieService.create(formData);
      }
      setIsFormOpen(false);
      setEditingPeriode(null);
      setFormData({ numero: "", date_debut: "", date_fin: ""});
      fetchPeriodes();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  // Préparer modification
  const handleEdit = (periode) => {
    setEditingPeriode(periode);
    setFormData({
      numero: periode.numero,
      date_debut: periode.date_debut,
      date_fin: periode.date_fin,
    });
    setError("");
    setIsFormOpen(true);
  };

  // Supprimer une période
  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cette période ?")) return;
    try {
      await PeriodeSaisieService.delete(id);
      fetchPeriodes();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-800">
          Gestion des périodes de saisie
        </h2>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingPeriode(null);
            setFormData({ numero: "", date_debut: "", date_fin: ""});
            setError("");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <CirclePlus size={22} /> Nouvelle période
        </button>
      </div>

      {/* Tableau des périodes */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-2 border">Numéro</th>
            <th className="px-4 py-2 border">Date début</th>
            <th className="px-4 py-2 border">Date fin</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {periodes.map((periode) => (
            <tr key={periode.id} className="text-center hover:bg-blue-50">
              <td className="px-4 py-2 border">{periode.numero}</td>
              <td className="px-4 py-2 border">{periode.date_debut}</td>
              <td className="px-4 py-2 border">{periode.date_fin}</td>
              <td className="px-4 py-2 border flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(periode)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Modifier"
                >
                  <PencilLine size={20} />
                </button>
                <button
                  onClick={() => handleDelete(periode.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Supprimer"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
          {periodes.length === 0 && (
            <tr>
              <td
                colSpan="4"
                className="px-4 py-3 text-gray-500 text-center italic"
              >
                Aucune période créée pour le moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulaire de création / modification */}
      {isFormOpen && (
        <div className="mt-6 p-4 border rounded-lg bg-blue-50">
          <h3 className="font-semibold text-blue-700 mb-3">
            {editingPeriode ? "Modifier la période" : "Nouvelle période"}
          </h3>

          {error && (
            <div className="mb-3 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Numéro"
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              name="date_debut"
              value={formData.date_debut}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              name="date_fin"
              value={formData.date_fin}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                setIsFormOpen(false);
                setEditingPeriode(null);
                setError("");
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
