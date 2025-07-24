"use client";
import Header from "../ui/Header";
import { usePathname } from "next/navigation";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const showHeader = !(
    pathname.startsWith("/etudiant") ||
    pathname.startsWith("/enseignant") ||
    pathname.startsWith("/administration")
  );
  return (
    <>
      {showHeader && <Header />}
      <div className={showHeader ? "pt-20" : ""}>{children}</div>
    </>
  );
} 