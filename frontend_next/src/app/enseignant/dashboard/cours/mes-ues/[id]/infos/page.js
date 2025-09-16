import InfosUe from "@/features/enseignant/dashboard/cours/infosUe";

export default async function PageInfosUe({ params }) {
  const { id } = params; 
  return <InfosUe ueId={id} />; 
}