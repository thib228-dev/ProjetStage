import { useEffect, useState } from "react";
import NoteService from "@/services/noteService";
import EtudiantService from "@/services/etudiantService";
import { useRouter } from "next/navigation";

function ListeEtudiantsUE({ ueId }) {
  const [etudiants, setEtudiants] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const router = useRouter();
  

  useEffect(() => {
    const fetchData = async () => {
      if (!ueId) return;
      try {
        const res = await EtudiantService.getNotesByUE(ueId);
        setEtudiants(res.etudiants);
        setEvaluations(res.evaluations);
        if (res.evaluations.length === 0) {
          router.push(`/enseignant/dashboard/cours/mes-ues/${ueId}/evaluations`);
        }
      } catch (err) {
        console.error("Erreur récupération notes :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ueId]);

  // Calcul de la moyenne pondérée
  const calculerMoyenne = (etu) => {
    let somme = 0;
    let totalPoids = 0;

    for (const evalObj of evaluations) {
      const note = etu.notes[evalObj.id];
      if (note === undefined || note === null) {
        return "-"; // ⚠️ Si une note manque → pas de moyenne
      }
      somme += note * evalObj.poids;
      totalPoids += evalObj.poids;
    }

    return totalPoids > 0 ? (somme / totalPoids).toFixed(2) : "-";
  };

  const handleEdit = (index, etu) => {
    setEditIndex(index);
    setEditedData({ note: etu.notes[selectedEvaluation.id] ?? "" });
  };

  const handleSave = async (index, etu) => {
    if (!selectedEvaluation) return;
    const noteValue = parseFloat(editedData.note);
    if (isNaN(noteValue) || noteValue < 0 || noteValue > 20) {
      alert("Veuillez entrer une note valide entre 0 et 20.");
      
    }

    try {
      await NoteService.createNote(etu.id, selectedEvaluation.id, noteValue);

      // Mettre à jour localement
      setEtudiants((prev) =>
        prev.map((e, i) =>
          i === index
            ? { ...e, notes: { ...e.notes, [selectedEvaluation.id]: noteValue } }
            : e
        )
      );

      setEditIndex(null);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Étudiants inscrits</h2>

      {/* Sélecteur d'évaluation */}
      <div className="mb-4">
        <label className="mr-2 font-bold">Type d'évaluation :</label>
        <select
          value={selectedEvaluation?.id || ""}
          onChange={(e) => {
            const evalChoisi = evaluations.find(
              (ev) => ev.id === parseInt(e.target.value)
            );
            setSelectedEvaluation(evalChoisi);
            setEditIndex(null);
          }}
          className="border rounded px-2 py-1"
        >
          <option value="" disabled>
            -- Choisir --
          </option>
          {evaluations.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.type} ({ev.poids}%)
            </option>
          ))}
        </select>
      </div>

      {/* Tableau */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">N° Carte</th>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Sexe</th>
            {selectedEvaluation && (
              <th className="border px-2 py-1 text-center">
                {selectedEvaluation.type} ({selectedEvaluation.poids}%)
              </th>
            )}
            <th className="border px-2 py-1 text-center">Moyenne</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((etu, index) => (
            <tr key={etu.id} className="even:bg-gray-50">
              <td className="border px-2 py-1 text-center">{etu.num_carte}</td>
              <td className="border px-2 py-1">{etu.nom}</td>
              <td className="border px-2 py-1">{etu.prenom}</td>
              <td className="border px-2 py-1 text-center">{etu.sexe}</td>

              {selectedEvaluation && (
                <td className="border px-2 py-1 text-center cursor-pointer">
                  {editIndex === index ? (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={editedData.note}
                      onChange={(e) =>
                        setEditedData({ note: e.target.value })
                      }
                      onBlur={() => handleSave(index, etu)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(index, etu);
                      }}
                      autoFocus
                      className="w-16 text-center border rounded"
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, etu)}>
                      {etu.notes[selectedEvaluation.id] ?? "-"}
                    </span>
                  )}
                </td>
              )}

              {/* ✅ Colonne moyenne */}
              <td className="border px-2 py-1 text-center font-bold">
                {calculerMoyenne(etu)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeEtudiantsUE;
