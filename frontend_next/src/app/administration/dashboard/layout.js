import MenuLateralAdmin from "../../../components/navigation/MenuLateralAdmin";
import Header from "../../../components/ui/Header";

export default function DashboardAdminLayout({ children }) {
  return (
    <>
      {/* Header en haut */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-teal-700 to-teal-700">
        <Header />
      </header>

      {/* Menu latéral fixé */}
      <aside className="hidden md:block fixed top-15 left-0 h-screen z-30">
        <MenuLateralAdmin />
      </aside>

      {/* Contenu fixe */}
      <main className="md:ml-64    ">
        {children}
      </main>
    </>
  );
}
