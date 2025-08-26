import React, { useState, useEffect } from "react";
import EvaluationService from "@/services/evaluationsService";

function EvaluationUE({ ueId }) {
  const [evaluations, setEvaluations] = useState([]);
  const [type, setType] = useState("");
  const [poids, setPoids] = useState("");

  // Récupérer toutes les évaluations
  useEffect(() => {
    EvaluationService.getEvaluationsByUE(ueId).then(res => setEvaluations(res.data));
  }, []);

  const handleCreate = async () => {
    try {
        if (!type || !poids) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
      setType("");
      setPoids("");
      const res = await EvaluationService.createEvaluation(type, parseFloat(poids), ueId);
      setEvaluations(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Erreur création évaluation :", err);
    }
  };

  const handleUpdate = async (id, newType, newPoids) => {
    try {
      const res = await EvaluationService.updateEvaluation(id, { type: newType, poids: newPoids });
      setEvaluations(prev => prev.map(ev => ev.id === id ? res.data : ev));
    } catch (err) {
      console.error("Erreur mise à jour :", err);
    }
  };

  return (
    <div>
      <h2>Gérer les évaluations</h2>

      {/* Formulaire création */}
      <div className="mb-4">
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">-- Type --</option>
          <option value="Devoir">Devoir</option>
          <option value="Examen">Examen</option>
          <option value="Projet">Projet</option>
        </select>
        <input 
          type="number" 
          placeholder="Poids (%)" 
          value={poids} 
          min={0}
          max ={100}
          step={10}
          onChange={e => setPoids(e.target.value)} 
          className="ml-2 border px-2"
        />
        <button onClick={handleCreate} className="ml-2 bg-blue-500 text-white px-2 py-1">Créer</button>
      </div>

      {/* Liste des évaluations */}
     {/*  <ul>
        {evaluations.map(ev => (
          <li key={ev.id}>
            {ev.type} - {ev.poids}%
            <button onClick={() => handleUpdate(ev.id, ev.type, ev.poids + 1)} className="ml-2">+1 poids</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default EvaluationUE;
