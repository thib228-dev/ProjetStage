"use client";
import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/ui/Header'; 

function Stepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-6 mb-10">
      {[1, 2, 3, 4].map((etape) => (
        <div key={etape} className="flex flex-col items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
            etape === currentStep 
              ? 'border-blue-700 bg-blue-100 text-blue-700' 
              : etape < currentStep
                ? 'border-green-500 bg-green-100 text-green-500'
                : 'border-gray-300 bg-white text-gray-400'
          } font-bold text-lg transition-all`}>
            {etape < currentStep ? '✓' : etape}
          </div>
          {etape <=4 && (
            <div className={`w-12 h-1 mt-1 mb-1 rounded ${
              etape < currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function InscriptionLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Détermine l'étape actuelle depuis l'URL
  const currentStep = parseInt(pathname.split('/').pop().replace('etape-', ''));

  const handleBack = () => {
    if (currentStep === 1) {
      // Retour à la page précédente dans l'historique
      router.back();
    } else {
      router.push(`/etudiant/inscription/etape-${currentStep - 1}`);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-50 min-h-screen font-sans pt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          <div className="flex items-center mb-4">
            <div className="w-1/3">
              <button 
                onClick={handleBack}
                className="text-blue-900 font-semibold hover:text-blue-800 transition-colors underline">
                Étape précédente
              </button>
            </div>
            
            <div className="w-1/3 flex justify-center">
              <Stepper currentStep={currentStep} />
            </div>
            
            <div className="w-1/3"></div>
          </div>
          
          {/* Contenu de l'étape */}
          <div className="mb-2">
            {children}
          </div>
          
          {/* Indicateur de progression */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Étape {currentStep} sur 4
          </div>
        </div>
      </div>
    </>
  );
}