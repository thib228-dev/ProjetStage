'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

const professeurs = [
  {
    id: 'Alain-AGBLEZE',
    nom: 'Alain AGBLEZE',
    titre: 'Docteur en informatique, consultant en IA',
    image: '/images/prof.png',
    bio: "Expert en IA et traitement du langage naturel avec 10 ans d'expérience dans la recherche et le développement d'algorithmes avancés.",
    articles: [
      "L'IA au service de l'éducation",
      "Réseaux neuronaux avancés",
      "NLP pour les langues africaines"
    ],
    projets: [
      "Système intelligent d'apprentissage",
      "Analyse prédictive pour la santé",
      "Reconnaissance vocale multilingue"
    ],
    encadrements: [
      "Mémoire 2024 - Étudiant X : Algorithmes d'apprentissage",
      "Thèse 2023 - Étudiant Y : Modèles génératifs"
    ],
    liensCours: [
      { label: "Introduction à l'IA", url: "#" },
      { label: "Machine Learning avancé", url: "#" },
      { label: "Traitement du langage naturel", url: "#" }
    ],
    contactEmail: "alain.agbleze@exemple.com",
    diplomes: [
      "PhD en Informatique - Université de Lomé",
      "Master en IA - Sorbonne Université"
    ],
    experience: [
      "Professeur Associé - Université de Lomé (2018-Présent)",
      "Chercheur IA - Google Research (2015-2018)"
    ]
  },
];

export default function ProfesseurDetail() {
  const { id } = useParams();
  const prof = professeurs.find(p => p.id === id);

  if (!prof) {
    return <div className="p-10 text-red-600 text-center">Professeur non trouvé 😕</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans text-gray-800">
      {/* Hero Section */}
      <div className="bg-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Take your time</h1>
          <p className="text-xl md:text-2xl mb-8">and learn from anywhere</p>
          <div className="bg-orange-500 inline-block px-6 py-2 rounded-full">
            <p className="font-semibold">Our Best Features - Special For You</p>
          </div>
        </div>
      </div>

      {/* Profil Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Profil info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <div className="flex flex-col items-center">
                <Image
                  src={prof.image}
                  alt={prof.nom}
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-blue-200 object-cover mb-6"
                />
                <h2 className="text-2xl font-bold text-center text-blue-800">{prof.nom}</h2>
                <p className="text-orange-600 text-center mb-6">{prof.titre}</p>
                
                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${prof.contactEmail}`} className="text-blue-600 hover:underline">
                      {prof.contactEmail}
                    </a>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Biographie</h3>
                    <p className="text-gray-700">{prof.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Diplômes</h3>
                    <ul className="list-disc list-inside text-gray-700 pl-2 space-y-1">
                      {prof.diplomes.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Expérience</h3>
                    <ul className="list-disc list-inside text-gray-700 pl-2 space-y-1">
                      {prof.experience.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Articles Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">Publications & Articles</h2>
              </div>
              <div className="space-y-4">
                {prof.articles.map((article, i) => (
                  <div key={i} className="border-l-4 border-orange-500 pl-4 py-2">
                    <h3 className="font-semibold text-lg">{article}</h3>
                    <p className="text-gray-600 text-sm">Publié le 15/06/2023</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projets Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">Projets de Recherche</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {prof.projets.map((projet, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h3 className="font-semibold text-blue-700">{projet}</h3>
                    <p className="text-gray-600 mt-2">Description du projet et objectifs...</p>
                    <div className="mt-3 flex justify-between text-sm text-gray-500">
                      <span>2022-2024</span>
                      <span>En cours</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Encadrement Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">Encadrement</h2>
              </div>
              <div className="space-y-4">
                {prof.encadrements.map((encadrement, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-orange-100 p-2 rounded-full mr-4 mt-1">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">{encadrement}</h3>
                      <p className="text-gray-600 text-sm">Sujet: Recherche en IA appliquée</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cours Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">Cours Dispensés</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {prof.liensCours.map((cours, i) => (
                  <a 
                    key={i}
                    href={cours.url}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full flex items-center transition"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {cours.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Contactez le professeur</h3>
              <p>Pour toute question ou collaboration</p>
            </div>
            
            <form className="w-full md:w-auto flex gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold transition whitespace-nowrap"
              >
                Envoyer message
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}