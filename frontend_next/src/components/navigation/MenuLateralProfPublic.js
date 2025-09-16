"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBook, FaFileAlt, FaProjectDiagram, FaUsers, FaClipboardList } from "react-icons/fa";

export default function MenuLateralProfPublic({ profId }) {
  const pathname = usePathname();

  // Générer les liens dynamiques avec l'ID du prof
  const links = [
    { href: `/nos-profs/${profId}/unites-d-enseignement`, label: "Cours", icon: <FaBook /> },
    { href: `/nos-profs/${profId}/articles`, label: "Articles", icon: <FaFileAlt /> },
    { href: `/nos-profs/${profId}/projets`, label: "Projets", icon: <FaProjectDiagram /> },
    { href: `/nos-profs/${profId}/encadrements`, label: "Encadrements", icon: <FaUsers /> },
    { href: `/nos-profs/${profId}/recherches`, label: "Recherches", icon: <FaClipboardList /> },
  ];

  return (
    <aside className="hidden md:flex flex-col gap-4 bg-white/70 backdrop-blur-2xl shadow-2xl w-64 h-screen sticky top-0 z-10 py-0 px-0 border-r border-black">
      <div className="flex-1 flex flex-col overflow-y-auto py-10 px-6">
        <div className="mb-8 flex items-center gap-2 justify-center">
          <span className="font-extrabold text-black text-2xl tracking-tight drop-shadow">EPL</span>
          <span className="bg-blue-100 text-black font-bold px-2 py-1 text-xs shadow">Enseignant</span>
        </div>
        <nav className="flex flex-col gap-2 text-lg font-semibold mt-10">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={
                (pathname === link.href
                  ? "bg-black-100 text-black-900 font-bold shadow-md "
                  : "text-black-700 hover:bg-black-50 hover:text-black-900 ") +
                " px-4 py-2 transition flex items-center gap-3 mt-4 mb-3"
              }
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-gray-400 mt-8 text-center select-none">
          &copy; EPL {new Date().getFullYear()}
        </div>
      </div>
    </aside>
  );
}
