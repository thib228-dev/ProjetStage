"use client";

import React from "react";
import EvaluationUE from "@/features/enseignant/dashboard/cours/evaluationUE";

export default function EvaluationUEPage({ params }) {
  const { id } = params;
  return (
    <main className=" w-full ">
      <EvaluationUE ueId={id} />
    </main>
  );
}
