// components/ui/ExportButton.jsx
"use client";
import { FaFileExport } from "react-icons/fa";

export default function ExportButton({ data, filename = "export", className = "" }) {
  const handleExport = () => {
    if (!data || data.length === 0) return;
    
    // Convertir en CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(item => headers.map(header => item[header]).join(","))
    ].join("\n");

    // Créer et télécharger le fichier
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!data || data.length === 0}
      className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 ${className}`}
    >
      <FaFileExport /> Exporter
    </button>
  );
}