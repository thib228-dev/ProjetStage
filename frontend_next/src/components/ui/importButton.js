"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { api } from "@/services/api"; // ton instance axios

export default function UploadNotes() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Lecture et prévisualisation
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setPreview(sheet);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Sélectionnez un fichier d'abord !");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/import-notes/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Importation réussie !");
    } catch (error) {
      console.error("Erreur upload", error);
      alert("Erreur d'importation");
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Importer des notes (Excel)</h2>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
      
      {preview.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Aperçu :</h3>
          <table className="border mt-2">
            <thead>
              <tr>
                {Object.keys(preview[0]).map((key) => (
                  <th key={key} className="border px-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="border px-2">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Envoyer au backend
      </button>
    </div>
  );
}
