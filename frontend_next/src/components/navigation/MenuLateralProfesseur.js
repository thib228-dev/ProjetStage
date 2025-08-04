"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaBook, FaClipboardList, FaProjectDiagram, FaFileAlt, FaUsers, FaChartBar, FaSignOutAlt, FaChalkboardTeacher } from "react-icons/fa";

const links = [
  { href: "/enseignant/dashboard/donnees-personnelles", label: "Données personnelles", icon: <FaUser /> },
  { href: "/enseignant/dashboard/cours", label: "Mes cours", icon: <FaChalkboardTeacher /> },
  { href: "/enseignant/dashboard/notes", label: "Notes à saisir", icon: <FaClipboardList /> },
  { href: "/enseignant/dashboard/projets", label: "Projets encadrés", icon: <FaProjectDiagram /> },
  { href: "/enseignant/dashboard/articles", label: "Articles publiés", icon: <FaFileAlt /> },
  { href: "/enseignant/dashboard/encadrements", label: "Encadrements", icon: <FaUsers /> },
  { href: "/enseignant/dashboard/statistiques", label: "Statistiques", icon: <FaChartBar /> },
];

export default function MenuLateralProfesseur() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col gap-4 bg-white/70 backdrop-blur-2xl shadow-2xl w-64 h-screen sticky top-0 z-10 py-0 px-0  border-r border-blue-700">
      <div className="flex-1 flex flex-col overflow-y-auto py-10 px-6">
        <div className="mb-8 flex items-center gap-2 justify-center">
          <span className="font-extrabold text-blue-700 text-2xl tracking-tight drop-shadow">EPL</span>
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded-lg text-xs shadow">Enseignant</span>
        </div>
        <nav className="flex flex-col gap-2 text-lg font-semibold">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={
                (pathname === link.href
                  ? "bg-blue-100 text-blue-900 font-bold shadow-md "
                  : "text-blue-700 hover:bg-blue-50 hover:text-blue-900 ") +
                "rounded-xl px-4 py-2 transition flex items-center gap-3"
              }
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-12 pt-8">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-900  hover:from-blue-600  text-white font-bold py-2 rounded-xl shadow-lg transition-all">
            <FaSignOutAlt /> Se déconnecter
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-8 text-center select-none">&copy; EPL {new Date().getFullYear()}</div>
      </div>
    </aside>
  );
} 