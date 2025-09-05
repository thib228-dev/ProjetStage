"use client";
import { usePathname } from "next/navigation";

export default function EtudiantLayoutWrapper({ children }) {
  const pathname = usePathname();

  // Afficher le headerConnexion on est dans /etudiant/dashboard
  const showHeader =(pathname.startsWith("/etudiant/dashboard") ); 
 
  return (
    <>
      {showHeader && <Header />}
      <div className={showHeader ? "pt-20" : ""}>{children}</div>
        
    </>
    
  );
   

}
