"use client";
import React, { useState } from "react";
import NouvelEtudiantStep1 from "./NouvelEtudiantStep1";
import NouvelEtudiantStep2 from "./NouvelEtudiantStep2";
import NouvelEtudiantStep3 from "./NouvelEtudiantStep3";
import NouvelEtudiantStep4 from "./NouvelEtudiantStep4";

export default function InscriptionContainer() {
  const [step, setStep] = useState(1);

  // Stockage des données globales de l'étudiant
  const [etudiantData, setEtudiantData] = useState({
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    date_naissance: "",
    sexe: "",
    adresse: "",
    photo: null,
    filiere: null,
    parcours: null,
    annee_etude: null,
    anneeAcademique: null,
  });

  const handleNext = (newData) => {
    setEtudiantData(prev => ({ ...prev, ...newData }));
    setStep(prev => prev + 1);
  };

  const handleBack = (newData) => {
    if(newData) setEtudiantData(prev => ({ ...prev, ...newData }));
    setStep(prev => prev - 1);
  };

  return (
    <>
      {step === 1 && <NouvelEtudiantStep1 onNext={handleNext} initialData={etudiantData} />}
      {step === 2 && <NouvelEtudiantStep2 onNext={handleNext} onBack={() => setStep(1)} initialData={etudiantData} />}
      {step === 3 && <NouvelEtudiantStep3 onNext={handleNext} onBack={() => setStep(2)} initialData={etudiantData} />}
      {step === 4 && <NouvelEtudiantStep4 etudiantData={etudiantData} onBack={() => setStep(3)} />}
    </>
  );
}
