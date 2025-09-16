import UEs from "@/features/nos_profs/cours";
import React from "react";
export default async function PageUEsPublic({ params }) {
  const { id } = params;

  return (
    <div>
      <UEs profId={id} />
    </div>
  );
}
