import ProjetsPublic from "@/features/nos_profs/projets";
import React from "react";

export default async function PageProjetsPublic({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>Projets for Professeur {id}</h1>
      <ProjetsPublic profId={id} />
    </div>
  );
}
