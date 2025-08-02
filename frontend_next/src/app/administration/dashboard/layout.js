import MenuLateralAdmin from "../../../components/navigation/MenuLateralAdmin";
import HeaderConnexion from "../../../components/ui/HeaderConnexion";


export default function DashboardAdminLayout({ children }) {
  return (
    <>
      {/* Header en haut */}
      <header className="fixed top-0 left-0 right-0 z-40  bg-gradient-to-r from-teal-700 to-teal-700">
        <HeaderConnexion />
      </header>
      <aside className="hidden md:block fixed top-15 left-0 h-screen z-30">
        <MenuLateralAdmin />
      </aside>
      <main className="md:ml-64 flex-1 min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 font-sans flex flex-col items-center justify-center px-4 py-12 pt-24 gap-8">
        {children}
      </main>
    </>
  );
} 