"use client";

import React from "react";
import  ListeEtudiantsUE from "@/features/resp_notes/dashboard/listes/listeEtudiant";

export default function PageCoursProf({ params }) {
  const { id } = params;

  return (
    <main className=" w-full ">
      <ListeEtudiantsUE ueId={id} />
    </main>
  );
}
