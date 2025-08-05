"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const menuItems = [
  { label: "Accueil", href: "/" },
  {
    label: "Étudiant",
    children: [
      { label: "Inscriptions", href: "/etudiant/inscription/etape-1" },
      {
        label: "Données personnelles",
        protected: true,
        href: "/etudiant/dashboard/donnees-personnelles",
      },
      {
        label: "Notes",
        protected: true,
        href: "/etudiant/dashboard/notes",
      },
      {
        label: "Statistiques",
        protected: true,
        href: "/etudiant/dashboard/statistiques",
      },
    ],
  },
  {
    label: "Nos Professeurs",
   /*  children: [
      { label: "articles", href: "/enseignant/dashboard/articles" },
      { label: "Cours", href: "/enseignant/dashboard/cours" },
      { label: "Encadrements", href: "/enseignant/dashboard/encadrements" },
      { label: "projets", href: "/enseignant/dashboard/projets" },
      {
        label: "informations",
        href: "/enseignant/dashboard/donnees-personnelles",
      },
    ], */
     href: "/nos-profs" 
  },
  {
    label: "Personnel administratif",
    children: [
      { label: "Enseignant",
        protected: true,
         href: "/enseignant/dashboard" },
      { label: "Secretaire",
        protected: true,
        href: "/administration/dashboard/enseignants" },
      { label: "chef service examen",
        protected: true,
        href: "/administration/dashboard/notes" },
      { label: "responsable inscription", protected: true, href: "/administration/dashboard/etudiants" },
    ],
  },
  {
    label: "Service examen",
    children: [
      { label: "Saisie de notes",
         href: "/enseignant/dashboard/notes" },
      { label: "Gestion examen",
        href: "/administration/dashboard/tableau-de-bord" },
    ],
  },
  { label: "Nos programmes", href: "/programmes" },
  { label: "Contactez-nous", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleProtectedRoute = (href) => {
    localStorage.setItem("etudiant_redirect", href);
    router.push("/etudiant/connexion");
  };
   const handleProtectedPersonnel = (href) => {
    localStorage.setItem("personnel_redirect", href);
    router.push("/enseignant/connexion");
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow fixed top-0 left-0 z-20 px-4 sm:px-8 py-3 h-16">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-extrabold text-blue-800 text-2xl tracking-wide">
          <img src="/images/logo-epl.png" className="h-10 w-auto" />
        </Link>

        <nav className="hidden sm:flex gap-6 font-semibold relative">
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

                {/* Dropdown */}
                {hasChildren && openDropdown === item.label && (
                 /*  <div className="absolute top-full left-0 bg-white shadow-md w-56 z-30">
                    {item.children.map((child) =>
                      child.protected ? (
                        <button
                          key={child.label}
                          onClick={() => handleProtectedRoute(child.href)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition"
                        >
                          {child.label}
                        </button>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div> */
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
        </nav>
      </div>
    </header>
  );
}