import { redirect } from "next/navigation";

export default function DashboardAdminRedirect() {
  redirect("/administration/dashboard/tableau-de-bord");
  return null;
} 