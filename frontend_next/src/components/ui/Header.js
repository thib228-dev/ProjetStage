import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow flex items-center justify-between px-4 sm:px-8 py-3 fixed top-0 left-0 z-20">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-extrabold text-blue-800 text-2xl tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition hover:text-blue-900">
          EPLPEDAGO
        </Link>
      </div>
      {/* Desktop nav */}
      <nav className="hidden sm:flex gap-8 font-semibold text-base">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={
                (isActive
                  ? "text-blue-700 font-bold shadow-sm bg-blue-100/70 "
                  : "text-gray-700 ") +
                "px-3 py-1 rounded transition hover:bg-blue-100 hover:text-blue-900"
              }
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      {/* Mobile menu button */}
      <button
        className="sm:hidden flex items-center px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Ouvrir le menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg className="w-7 h-7 text-blue-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>
      {/* Mobile nav */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white/95 shadow-lg flex flex-col items-center gap-2 py-4 sm:hidden animate-fade-in z-30">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={
                  (isActive
                    ? "text-blue-700 font-bold shadow-sm bg-blue-100/70 "
                    : "text-gray-700 ") +
                  "w-full text-center px-3 py-2 rounded transition hover:bg-blue-100 hover:text-blue-900"
                }
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
} 