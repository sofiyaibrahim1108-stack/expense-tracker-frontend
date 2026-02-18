"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  User, 
  LogOut, 
  Settings,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100 w-64">
      {/* Logo Section */}
      <div className="p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black italic">E</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic">
            Expense.it
          </h1>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
          Main Menu
        </p>
        
        <NavItem 
          href="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={pathname === "/dashboard"} 
        />
        <NavItem 
          href="/expenses" 
          icon={<Receipt size={20} />} 
          label="Expenses" 
          active={pathname === "/expenses"} 
        />
        <NavItem 
          href="/category" 
          icon={<PieChart size={20} />} 
          label="Category" 
          active={pathname === "/category"} 
        />
        
        <div className="my-6 border-t border-slate-50 mx-4" />
        
        <p className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
          Account
        </p>
        
        <NavItem 
          href="/profile" 
          icon={<User size={20} />} 
          label="Profile" 
          active={pathname === "/profile"} 
        />
        <NavItem 
          href="/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={pathname === "/settings"} 
        />
      </nav>

      {/* User & Logout Section */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-black text-slate-700 truncate capitalize">
              {user?.username || "User"}
            </span>
            <span className="text-[10px] font-bold text-slate-400 truncate">
              {user?.email || "user@example.com"}
            </span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-100/50 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </div>
          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </div>
    </div>
  );
}

// NavItem Component with Active State Styling
function NavItem({ href, icon, label, active }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all font-bold text-sm group ${
        active 
        ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`${active ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"} transition-colors`}>
          {icon}
        </span>
        {label}
      </div>
      {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
    </Link>
  );
}