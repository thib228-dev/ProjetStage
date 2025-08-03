"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const menuItems = [
  { label: "Accueil", href: "/" },
  {
    label: "Étudiant",
    children: [     
      { label: "Inscriptions", href: "/etudiant/inscription/etape-1" },
      { label: "Données personnelles", href: "/etudiant/dashboard/donnees-personnelles" },
      { label: "Notes", href: "/etudiant/dashboard/notes" },
      { label: "Statistiques", href: "/etudiant/dashboard/statistiques" },
    ],
  },
  {
    label: "Enseignant",
    children: [
      { label: "articles", href: "/enseignant/articles" },
      { label: "Cours", href: "/enseignant/cours" },
      { label: "Encadrements", href: "/enseignant/encadrements" },
      { label: "projets", href: "/enseignant/projets" },
      {label: "informations", href: "/enseignant/dashboard/donnees-personnelles" },
    ],
  },
  {
    label: "Personnel administratif",
    children: [
      { label: "Secretaire", href: "/administration/dashboard/enseignants" },
      { label: "chef service examen", href: "/administration/dashboard/notes" },
      { label: "responsable inscription", href: "/administration/dashboard/etudiants" },
    ],
  },
  { label: "Service examen", href: "/notes" },
  { label: "Nos programmes", href: "/programmes" },
  { label: "Contactez-nous", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow fixed top-0 left-0 z-20 px-4 sm:px-8 py-3 h-16">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-extrabold text-blue-800 text-2xl tracking-wide">
            <img src="images/logo-epl.png"  className="h-10 w-auto" />
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
                <button
                  className={`px-3 py-2 rounded transition flex items-center gap-1 ${
                    isActive
                      ? "text-blue-700 font-bold bg-blue-100/70"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {item.label}
                  {hasChildren && (
                    <span className="text-xs">▼</span> 
                  )}
                </button>

                {/* Dropdown */}
                {hasChildren && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-md  w-56 z-30 ">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition `}
                      >
                        {child.label}
                      </Link>
                    ))}
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
