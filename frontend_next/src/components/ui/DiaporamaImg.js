"use client";

import { useState, useEffect } from "react"; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/epl-building.png",
    title: "Bievenue à L'EPL!, Ecole au service de l'exellence",
    description: "",
    link: "/en-savoir-plus",
  },
  {
    image: "/images/epl-gaya.jpg",
    title: "Autre slide title",
    description: "",
    link: "/en-savoir-plus",
  },
  {
    image: "/images/epl-ancy.jpg",
    title: "Encore un autre titre",
    description: "",
    link: "/en-savoir-plus",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[700px] w-full  overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
  src={slide.image}
  alt={slide.title}
  fill
  style={{ objectFit: "cover" }}
  className="rounded-none"
  priority={index === 0}
/>
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-600 to-blue-900 opacity-70"></div>

         {/* Texte divisé avec une barre verticale */}
          <div className="absolute  inset-0 flex items-center justify-center text-white px-6">
            <div className="flex items-center gap-10 bg-transparent p-6 ">
              
              {/* Colonne gauche : Titre */}
              <div className="text-right">
                <h2 className="text-3xl lg:text-4xl font-bold max-w-md">{slide.title}</h2>
              </div>
          
              {/* Barre verticale */}
              <div className="w-[2px] h-16 bg-white opacity-50"></div>
          
              {/* Colonne droite : bouton */}
              <div className="text-left">
                <Link href={slide.link}>
                  <span className="inline-block bg-orange-500 px-5 py-2 rounded hover:bg-orange-600 transition font-semibold">
                    En savoir plus
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Boutons de navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-btransparent text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition z-20 border border-white"
      >
        <FaChevronLeft className="text-4xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-btransparent text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition z-20 border border-white"
      >
        <FaChevronRight className="text-4xl" />
      </button>
    </div>
  );
}
