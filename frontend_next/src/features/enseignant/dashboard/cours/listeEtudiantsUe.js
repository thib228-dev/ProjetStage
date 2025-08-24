import { useEffect, useState } from "react";
import UEService from "@/services/ueService";
import EvaluationService from "@/services/evaluationsService";
import NoteService from "@/services/noteService";

function ListeEtudiantsUE({ ueId }) {
  const [etudiants, setEtudiants] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(""); // valeur choisie
  const [editIndex, setEditIndex] = useState(null); // index de l'étudiant en cours d'édition const [editIndex, setEditIndex] = useState(null); // <-- ajoute ça
  const [editedData, setEditedData] = useState({
    note_devoir: "",
    note_examen: "",
  });
  const [selectedRow, setSelectedRow] = useState(null); // index de la ligne sélectionnée
  const etudiantSelectionne = selectedRow !== null ? etudiants[selectedRow] : null;

  const handleEdit = (index, etudiant) => {
    setEditIndex(index); // active le champ édition
    setEditedData({
      note_devoir: etudiant.note_devoir ?? "",
      note_examen: etudiant.note_examen ?? "",
    });
  };
 

  // Recuperation des etudiants inscrits à l'UE
  useEffect(() => {
    const fetchEtudiants = async () => {
      console.log(">>> ueId reçu dans ListeEtudiantsUE:", ueId);
      const data = await UEService.getEtudiantsByUE(ueId);
      setEtudiants(data);
      console.log("Étudiants récupérés:", data);
    };
     if (ueId) {   
    fetchEtudiants();
  }
  }, [ueId]);

// Récupérer les évaluations pour la UE donnée
  useEffect(() => {
    const fetchEvaluations = async () => {
      const data = await EvaluationService.getEvaluationsByUE(ueId);
      setEvaluations(data);
      console.log("Evaluations récupérés:", data);
    };
     if (ueId) {   
    fetchEvaluations();
  }
  }, [ueId]);


/* const handleSave = () => {
  if (etudiantSelectionne) {
    const etudiantId = etudiantSelectionne.id;
    console.log("Enregistrement pour l'étudiant ID:", etudiantId); 
    const evaluationId = localStorage.getItem("evaluationId");
    const evaluationType = selectedEvaluation;
    const noteValue = evaluationType === "Devoir" ? editedData.note_devoir : editedData.note_examen;

    // Appel au service pour créer la note
    if (noteValue >= 0 && noteValue <= 20 && !isNaN(noteValue)) {
      NoteService.createNote(etudiantId, evaluationId, parseFloat(noteValue))
        .then((res) => {
          console.log("Note créée :", res);
          // Mettre à jour le tableau pour que la note reste affichée
          setEtudiants((prevEtudiants) =>
            prevEtudiants.map((et, idx) =>
              idx === selectedRow
                ? {
                    ...et,
                    note_devoir:
                      evaluationType === "Devoir" ? parseFloat(noteValue) : et.note_devoir,
                    note_examen:
                      evaluationType === "Examen" ? parseFloat(noteValue) : et.note_examen,
                  }
                : et
            )
          );
          //  quitter le mode édition
          setEditedData({});
          setSelectedRow(null);
        })
        .catch((err) => {
          console.error("Erreur lors de la création :", err);
        });
    } else {
      alert("Veuillez entrer une note valide entre 0 et 20.");
      return;
    }
  }
};
 */
const handleSave = async (currentIndex) => {
  if (!etudiantSelectionne) return;

  const etudiantId = etudiantSelectionne.id;
  const evaluationId = localStorage.getItem("evaluationId");
  const evaluationType = selectedEvaluation;
  const noteValue = evaluationType === "Devoir" ? editedData.note_devoir : editedData.note_examen;

  if (!evaluationId) {
    alert("Veuillez sélectionner une évaluation.");
    return;
  }

  if (noteValue < 0 || noteValue > 20 || isNaN(noteValue)) {
    alert("Veuillez entrer une note valide entre 0 et 20.");
    return;
  }

  try {
    const res = await NoteService.createNote(etudiantId, evaluationId, parseFloat(noteValue));
    console.log("Note créée :", res);

    // Mise à jour du tableau
    setEtudiants((prev) =>
      prev.map((et, idx) =>
        idx === currentIndex
          ? {
              ...et,
              note_devoir: evaluationType === "Devoir" ? parseFloat(noteValue) : et.note_devoir,
              note_examen: evaluationType === "Examen" ? parseFloat(noteValue) : et.note_examen,
            }
          : et
      )
    );

    // Vérifier si dernière ligne
    const nextIndex = currentIndex + 1;
    if (nextIndex < etudiants.length) {
      handleEdit(nextIndex, etudiants[nextIndex]);
    } else {
      setSelectedRow(null);
      setEditedData({});
      console.log("Fin de la saisie des notes");
      alert("Fin de la saisie des notes.");
    }
  } catch (err) {
    console.error("Erreur lors de la création :", err);
  }
};



  const handleKeyDown = async (e, currentIndex) => {
    if (e.key === "Enter") {
      handleSave(currentIndex);

      // Passer à la ligne suivante
      const nextIndex = currentIndex + 1;
      /* if (nextIndex < etudiants.length) {
        handleEdit(nextIndex, etudiants[nextIndex]);
      } */
      if (nextIndex < etudiants.length) {
      // Passer à la ligne suivante
      handleEdit(nextIndex, etudiants[nextIndex]);
      } else {
      // Dernière ligne : quitter le mode édition
      setEditedData({ note_devoir: "", note_examen: "" });
      setSelectedRow(null);
     
      console.log("Fin de la saisie des notes");
      alert("Fin de la saisie des notes.");
    }
  };


  };


  return (
    <div>
      <h1>Étudiants inscrits</h1>
      <div className="border p-4 mt-10">
         <div>
              <span className="text-black font-bold text-sm ml-5">
                Type d'evaluation: 
              </span>
            
              <select
                value={selectedEvaluation}
               // onChange={(e) => setSelectedEvaluation(e.target.value)}
                 onChange={(e) => {
                        const selectedType = e.target.value;
                        setSelectedEvaluation(selectedType);

                        // Récupérer l'objet evaluation correspondant
                        const evaluationObj = evaluations.find(ev => ev.type === selectedType);
                        if (evaluationObj) {
                          localStorage.setItem("evaluationId", evaluationObj.id);
                          console.log("Evaluation ID stocké:", evaluationObj.id);
                        }
                      }}
                className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
              >
                {/* Option par défaut */}
                <option value="" disabled className="text-black">
                 Type d'évaluation 
                </option>

                {/* Options venant du backend */}
                {evaluations.map((evaluation, index) => (
                  <option key={index} value={evaluation.type} className="text-black">
                    {evaluation.type}
                  </option>
                ))}
              </select>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-sm text-center">N° CARTE</th>
                  <th className="px-4 py-2 text-sm text-center">NOM</th>
                  <th className="px-4 py-2 text-sm text-center">PRÉNOMS</th>
                  <th className="px-4 py-2 text-sm text-center">SEXE</th>
                  <th className="px-4 py-2 text-sm text-center">Devoir</th>
                  <th className="px-4 py-2 text-sm text-center">Examen</th>
                  <th className="px-4 py-2 text-sm text-center">Moyenne</th>
                  
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant, index) => (
                  <tr
                    key={`${etudiant.numero_carte}-${index}`}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} ${selectedRow === index ? "bg-gray-200" : ""}`}
                      onClick={() => {
                        setSelectedRow(index); // sélectionne la ligne
                        setEditedData({
                          note_devoir: etudiant.note_devoir,
                          note_examen: etudiant.note_examen
                        });
                      }}
                  >
                    <td className="px-4 py-2 text-center">
                      {etudiant.num_carte}
                    </td>
                    <td className="px-4 py-2 text-center">{etudiant.utilisateur.last_name}</td>
                    <td className="px-4 py-2 text-center">{etudiant.utilisateur.first_name}</td>
                    <td className="px-4 py-2 text-center">{etudiant.utilisateur.sexe}</td>
                
                      {selectedEvaluation === "Devoir" && (
                        <td
                          className="px-4 py-2 text-center cursor-pointer"
                          onClick={() => handleEdit(index, etudiant)}
                        >
                          {editIndex === index ? (
                            <input
                              id="devoir-input"
                              type="number"
                              value={editedData.note_devoir ?? ""}
                              onChange={(e) => {
                                console.log("Valeur saisie :", e.target.value);
                                setEditedData({
                                  ...editedData,
                                  note_devoir: e.target.value,
                                });
                              }}
                              disabled={selectedEvaluation !== "Devoir"}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              autoFocus
                              className="w-16 text-center border rounded bg-gray-100 disabled:opacity-50"
                            />
                          ) : (
                            etudiant.note_devoir
                          )}
                        </td>
                      )}

                      {selectedEvaluation === "Examen" && (
                        <td
                          className="px-4 py-2 text-center cursor-pointer"
                          onClick={() => handleEdit(index, etudiant)}
                        >
                          {editIndex === index ? (
                            <input
                              id="examen-input"
                              type="number"
                              value={editedData.note_examen ?? ""}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  note_examen: e.target.value,
                                })
                              }
                              disabled={selectedEvaluation !== "Examen"}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              autoFocus
                              className="w-16 text-center border rounded bg-gray-100"
                            />
                          ) : (
                            etudiant.note_examen
                          )}
                        </td>
                      )}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
}


export default ListeEtudiantsUE;
