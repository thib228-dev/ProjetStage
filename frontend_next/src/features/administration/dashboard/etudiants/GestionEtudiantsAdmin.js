"use client";

import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileExport,
  FaArrowLeft,
  FaArrowRight,
  FaSync,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import etudiantService from "@/services/etudiants/etudiantService";

export default function GestionEtudiantsAdmin() {
  // -------------------------------
  // STATES
  // -------------------------------
  const [etudiants, setEtudiants] = useState([]);
  const [parcoursList, setParcoursList] = useState([]);
  const [filieresList, setFilieresList] = useState([]);
  const [anneesList, setAnneesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    parcours: "",
    filiere: "",
    anneeEtude: "",
    page: 1,
    pageSize: 10,
  });

  const [pagination, setPagination] = useState({
    count: 0,
    total_pages: 1,
  });

  // -------------------------------
  // CHARGEMENT DES ÉTUDIANTS
  // -------------------------------
  const loadEtudiants = async () => {
    try {
      setLoading(true);
      const data = await etudiantService.getAllEtudiants(filters);
      setEtudiants(data.results || []);
      setPagination({
        count: data.count || 0,
        total_pages: data.total_pages || 1,
      });
    } catch (error) {
      console.error("Erreur chargement étudiants :", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // CHARGEMENT DES PARCOURS
  // -------------------------------
  useEffect(() => {
    const fetchParcours = async () => {
      try {
        const data = await etudiantService.getParcours();
        setParcoursList(data.results || []);
      } catch (err) {
        console.error("Erreur parcours :", err);
      }
    };
    fetchParcours();
  }, []);

  // -------------------------------
  // CHARGEMENT DES FILIÈRES ET ANNÉES
  // -------------------------------
  useEffect(() => {
    if (!filters.parcours) {
      setFilieresList([]);
      setFilters((prev) => ({ ...prev, filiere: "" }));
      setAnneesList([]);
      setFilters((prev) => ({ ...prev, anneeEtude: "" }));
      return;
    }

    const fetchFilieresEtAnnees = async () => {
      try {
        const filieres = await etudiantService.getFilieresByParcours(filters.parcours);
        setFilieresList(filieres || []);
        const annees = await etudiantService.getAnneesByParcours(filters.parcours);
        setAnneesList(annees || []);
      } catch (err) {
        console.error("Erreur filières/années :", err);
      }
    };

    fetchFilieresEtAnnees();
  }, [filters.parcours]);

  // -------------------------------
  // HANDLERS
  // -------------------------------
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleExportCSV = () => {
    const headers = ["Num Carte", "Nom", "Prénom", "Email", "Contact", "Année"];
    const rows = etudiants.map((e) => [
      e.num_carte,
      e.utilisateur?.last_name || "",
      e.utilisateur?.first_name || "",
      e.utilisateur?.email || "",
      e.utilisateur?.contact || "",
      e.annee_etude?.nom || "",
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "etudiants.csv");
  };

  const handleExportExcel = () => {
    const wsData = etudiants.map((e) => ({
      "Num Carte": e.num_carte,
      Nom: e.utilisateur?.last_name || "",
      Prénom: e.utilisateur?.first_name || "",
      Email: e.utilisateur?.email || "",
      Contact: e.utilisateur?.contact || "",
      Année: e.annee_etude?.nom || "",
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Étudiants");
    XLSX.writeFile(wb, "etudiants.xlsx");
  };

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;

    try {
      await etudiantService.deleteEtudiant(id);
      alert("Étudiant supprimé avec succès !");
      loadEtudiants();
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const handleEdit = (etudiant) => {
    // Ici tu peux rediriger vers un formulaire de modification ou ouvrir un modal
    alert(`Modifier étudiant : ${etudiant.utilisateur?.first_name} ${etudiant.utilisateur?.last_name}`);
  };

  // -------------------------------
  // EFFECT LOAD
  // -------------------------------
  useEffect(() => {
    loadEtudiants();
  }, [filters.page, filters.pageSize, filters.parcours, filters.filiere, filters.anneeEtude, filters.search]);

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className="p-6 ">
      <h2 className="text-xl font-bold mb-4">Gestion des Étudiants</h2>

      {/* Filtres et Export */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex items-center border rounded-lg p-2 bg-white">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="outline-none"
          />
        </div>

        <select
          value={filters.parcours}
          onChange={(e) => handleFilterChange("parcours", e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">-- Sélectionner un parcours --</option>
          {Array.isArray(parcoursList) &&
            parcoursList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.libelle}
              </option>
            ))}
        </select>

        <select
          value={filters.filiere}
          onChange={(e) => handleFilterChange("filiere", e.target.value)}
          className="border p-2 rounded-lg"
          disabled={!filters.parcours}
        >
          <option value="">-- Sélectionner une filière --</option>
          {Array.isArray(filieresList) &&
            filieresList.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nom}
              </option>
            ))}
        </select>

        <select
          value={filters.anneeEtude}
          onChange={(e) => handleFilterChange("anneeEtude", e.target.value)}
          className="border p-2 rounded-lg"
          disabled={!filters.parcours}
        >
          <option value="">-- Sélectionner une année --</option>
          {Array.isArray(anneesList) &&
            anneesList.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nom}
              </option>
            ))}
        </select>

        <button
          onClick={handleExportExcel}
          className="flex items-center px-4 py-2 bg-green-700 text-white rounded-lg shadow hover:bg-green-800"
        >
          <FaFileExport className="mr-2" /> Exporter
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto bg-white  shadow">
        {loading ? (
          <p className="p-4 text-center">Chargement...</p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Num Carte</th>
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-left">Prénom</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Contact</th>
                <th className="p-2 text-left">Année</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.length > 0 ? (
                etudiants.map((e, i) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{(filters.page - 1) * filters.pageSize + i + 1}</td>
                    <td className="p-2">{e.num_carte}</td>
                    <td className="p-2">{e.utilisateur?.last_name}</td>
                    <td className="p-2">{e.utilisateur?.first_name}</td>
                    <td className="p-2">{e.utilisateur?.email}</td>
                    <td className="p-2">{e.utilisateur?.contact}</td>
                    <td className="p-2">{e.annee_etude?.nom}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(e)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    Aucun étudiant trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={filters.page <= 1}
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
          className="flex items-center px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          <FaArrowLeft className="mr-1" /> Précédent
        </button>

        <span>
          Page {filters.page} / {pagination.total_pages}
        </span>

        <button
          disabled={filters.page >= pagination.total_pages}
          onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
          className="flex items-center px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Suivant <FaArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}
