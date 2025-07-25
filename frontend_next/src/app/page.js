import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">
      

      {/* Hero section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] pt-32 pb-16 px-4 text-center overflow-hidden">
        <Image
          src="/images/epl-building.png"
          alt=""
          fill
          className="object-cover object-center absolute inset-0 w-full h-full z-0"
          aria-hidden="true"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 opacity-70 z-10 pointer-events-none" />
        <div className="relative z-20">
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight">Bienvenue à l'EPL</h1>
          <p className="text-lg sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
            L'École Polytechnique de Lomé, au service de l'excellence scientifique et technologique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/en-savoir-plus" className="bg-white/80 backdrop-blur-md text-blue-800 font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-blue-100/80 hover:scale-105 transition-all border border-blue-200 text-center">En savoir plus</Link>
            <Link href="/programmes" className="bg-blue-700/90 text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-blue-800/90 hover:scale-105 transition-all border border-blue-900/10 text-center">Programmes</Link>
          </div>
        </div>
      </section>

      {/* Espace accès modernisé */}
      <section className="flex flex-col sm:flex-row gap-8 justify-center items-center py-12">
        <Link href="/etudiant" className="flex flex-col items-center gap-3 bg-white/90 border border-blue-100 rounded-2xl shadow-xl w-72 py-8 px-4 hover:scale-105 hover:shadow-2xl transition-all group">
          <span className="bg-blue-100 text-blue-700 rounded-full p-4 text-4xl shadow group-hover:bg-blue-600 group-hover:text-white transition-all">
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-10 h-10'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
          </span>
          <span className="text-xl font-semibold text-blue-900">Espace Étudiant</span>
        </Link>
        <Link href="/enseignant" className="flex flex-col items-center gap-3 bg-white/90 border border-orange-100 rounded-2xl shadow-xl w-72 py-8 px-4 hover:scale-105 hover:shadow-2xl transition-all group">
          <span className="bg-orange-100 text-orange-700 rounded-full p-4 text-4xl shadow group-hover:bg-orange-500 group-hover:text-white transition-all">
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-10 h-10'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0l-9-5m9 5l9-5' /></svg>
          </span>
          <span className="text-xl font-semibold text-orange-900">Espace Enseignant</span>
        </Link>
        <Link href="/administration" className="flex flex-col items-center gap-3 bg-white/90 border border-teal-100 rounded-2xl shadow-xl w-72 py-8 px-4 hover:scale-105 hover:shadow-2xl transition-all group">
          <span className="bg-teal-100 text-teal-700 rounded-full p-4 text-4xl shadow group-hover:bg-teal-500 group-hover:text-white transition-all">
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-10 h-10'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 01.88 7.903A5.5 5.5 0 0112 21.5a5.5 5.5 0 01-4.88-6.597A4 4 0 1116 7z' /></svg>
          </span>
          <span className="text-xl font-semibold text-teal-900">Espace Administrateur</span>
        </Link>
      </section>
    </div>
  );
}
