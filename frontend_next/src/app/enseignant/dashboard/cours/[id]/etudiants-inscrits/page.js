"use client";

import React from "react";
import ListeEtudiantsUE from "@/features/enseignant/dashboard/cours/listeEtudiantsUe";

export default  function PageEtudiantUe({ params }) {
  const { id } = params;
  console.log("SelectedUeId paa:", id);
  return (
    <main className=" w-full ">
      <ListeEtudiantsUE ueId ={id} />
    </main>
  );
}
