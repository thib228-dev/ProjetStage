import MenuLateralProfesseur from "../../../components/navigation/MenuLateralProfesseur";
import Header from "../../../components/ui/Header";


export default function DashboardProfLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['professeur']}>
      <>
        {/* Header en haut */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-orange-700 to-orange-700">
          <Header />
        </header>
        <aside className="hidden md:block fixed top-15 left-0 h-screen z-30">
          <MenuLateralProfesseur />
        </aside>
        <main className="md:ml-64 flex-1 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans flex flex-col items-center justify-center px-4 py-12 pt-24 gap-8">
          {children}
        </main>
      </>
    </ProtectedRoute>
  );
} 