import { redirect } from "next/navigation";

export default async  function DashboardProfRedirect({ params }) {
    const { id } = params;
  redirect(`/nos-profs/${id}/unites-d-enseignement`);
  return null;
} 
