"use client";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Logo + Présentation */}
        <div>
          <h2 className="text-xl font-bold mb-3">EPLPEDAGO</h2>
          <p className="text-sm">
            Plateforme pédagogique de l’École Polytechnique de Lomé. Suivez votre parcours en toute simplicité.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> +228 90 00 00 00
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> contact@epl.ul
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> Université de Lomé, Togo
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Suivez-nous</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-sm mt-10 border-t border-white/30 pt-4">
        © {new Date().getFullYear()} EPLPEDAGO - Tous droits réservés
      </div>
    </footer>
  );
}
