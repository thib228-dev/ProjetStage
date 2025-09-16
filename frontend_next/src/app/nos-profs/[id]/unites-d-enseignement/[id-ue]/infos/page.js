import InfosUePublic from "@/features/nos_profs/infosUePublic";

export default async function PageInfosUePublic({ params }) {
  const { id } = params;

  return (
    <div>
      <InfosUePublic ueId={id} />
    </div>
  );
}
