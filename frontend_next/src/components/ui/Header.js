
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

/* const menuItems = [
  { label: "Accueil", href: "/" },
  {
    label: "Étudiant",
    children: [
      { label: "Inscriptions", href: "/etudiant/inscription/etape-1" },
      {label: "Données personnelles",protected: true,href: "/etudiant/dashboard/donnees-personnelles"},
      {label: "Notes",protected: true,href: "/etudiant/dashboard/notes"},
      {label: "Statistiques",protected: true,href: "/etudiant/dashboard/statistiques"},
    ],
  },
  {
    label: "Nos Professeurs",href: "/nos-profs" 
  },
  { label: "Nos programmes", href: "/programmes" },
  { label: "Contactez-nous", href: "/contact" },
]; */
// Menus selon rôles
  const baseMenu = [
    { label: "Accueil", href: "/" },
    { label: "Nos Professeurs", href: "/nos-profs" },
    {
      label: "Étudiant",
      children: [
        { label: "Inscriptions", href: "/etudiant/inscription/etape-1" },
        { label: "Données personnelles", protected: true, href: "/etudiant/dashboard/donnees-personnelles" },
        { label: "Notes", protected: true, href: "/etudiant/dashboard/notes" },
      {label: "Statistiques",protected: true,href: "/etudiant/dashboard/statistiques"},
      ],
    },
    { label: "Nos programmes", href: "/programmes" },
    { label: "Contactez-nous", href: "/contact" },
    
  ];

  const personnelMenu = [
    { label: "Accueil", href: "/" },
    { label: "Nos Professeurs", href: "/nos-profs" },
    { label: "Nos programmes", href: "/programmes" },
    { label: "Contactez-nous", href: "/contact" },
    {
      label: "Personnel",
      children: [
        { label: "Gestion Étudiants", href: "/admin/etudiants" },
        { label: "Gestion Professeurs", href: "/admin/professeurs" },
      ],
    },
    { label: "Service examen", href: "/enseignant/dashboard/cours" },
  ];


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
  const storedRole = localStorage.getItem("user_role");
  if (storedRole) {
    setRole(storedRole);
  } 
  else {
    setRole("visiteur"); // rôle par défaut
  }
}, []);

// Construire menu final selon user.role
  let menuItems = [...baseMenu];

if (role === "admin"|| role === "professeur"|| role === "secretaire"|| role === "responsable inscriptions"|| role === "chef service examen") {
  menuItems = [...personnelMenu];
}


  const handleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleProtectedRoute = (href) => {
    localStorage.setItem("etudiant_redirect", href);
    router.push("/login");
  };
  
  const handleProtectedPersonnel = (href) => {
    localStorage.setItem("personnel_redirect", href);
    router.push("/login");
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow fixed top-0 left-0 z-20 px-4 sm:px-8 py-3 h-16">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-extrabold text-blue-800 text-2xl tracking-wide">
          <img src="/images/logo-epl.png" className="h-10 w-auto" />
        </Link>

        <nav className="hidden sm:flex gap-6 font-semibold relative items-center">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const hasChildren = !!item.children;

            return (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => handleDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {hasChildren ? (
                  <button
                    className={`px-3 py-2 rounded transition flex items-center gap-1 ${
                      isActive
                        ? "text-blue-700 font-bold bg-blue-100/70"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {item.label}
                    <span className="text-xs">▼</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded transition flex items-center gap-1 ${
                      isActive
                        ? "text-blue-700 font-bold bg-blue-100/70"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {hasChildren && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-md w-56 z-30">
                    {item.children.map((child) => {
                      const specialLabels = ["Enseignant", "Secretaire", "Responsable inscriptions", "Chef service examen"];
                      const isSpecial = specialLabels.includes(child.label);
                  
                      if (child.protected) {
                        return (
                          <button
                            key={child.label}
                            onClick={() =>
                              isSpecial
                                ? handleProtectedPersonnel(child.href)
                                : handleProtectedRoute(child.href)
                            }
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition"
                          >
                            {child.label}
                          </button>
                        );
                      }

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition"
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bouton Connexion  */}
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-1"
          >
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
}