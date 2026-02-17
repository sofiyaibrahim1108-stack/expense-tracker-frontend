import Sidebar from "../../../components/Sidebar"; // Alias use pannunga illa path-a check pannunga
import Header from "../../../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar: Fixed width column */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <Sidebar />
      </aside>

      {/* Main Content: Right side flexible column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 sticky top-0">
          <Header />
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}