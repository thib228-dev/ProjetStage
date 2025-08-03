"use client"
import { ArrowLeft, UserCircle } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function NavbarRetourAccueil() {
  const router = useRouter();

  // Simulation de l'utilisateur connecté
  const user = {
    nom: "KOFFIH",
    prenom: "Abla Lena",
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <nav className=" text-white flex justify-between items-center px-4 py-5 shadow-sm border-b border-blue-500 bg-blue-900">
      {/* Bouton retour  */}
      <div 
        className="flex items-center gap-2 cursor-pointer hover:bg-blue-500/20 px-3 py-1 rounded-lg transition-all duration-200" 
        onClick={handleBack}
      >
        <ArrowLeft className="w-4 h-4 text-blue-100" />
        <span className="font-semibold text-blue-100 text-sm">Retour à l'accueil</span>
      </div>

      {/* Informations utilisateur */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <span className="font-bold text-sm block uppercase tracking-wide">
            {user.nom} {user.prenom}
          </span>
        </div>
        <div className="bg-white/15 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center border border-white/30 shadow-sm">
          <UserCircle className="text-white w-4 h-4" />
        </div>
      </div>
    </nav>
  );
}