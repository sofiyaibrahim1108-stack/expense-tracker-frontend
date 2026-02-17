import Link from "next/link";
import { LayoutDashboard, Receipt, PieChart, User, LogOut, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-2xl font-black text-indigo-600 tracking-tighter italic">Expense.it</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1">
        <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem href="/dashboard/expenses" icon={<Receipt size={20} />} label="Expenses" />
        <NavItem href="/dashboard/category" icon={<PieChart size={20} />} label="Category" />
        
        {/* Category-ku kila Profile option */}
        <NavItem href="/dashboard/profile" icon={<User size={20} />} label="Profile" />
        
        <NavItem href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" />
      </nav>

      {/* Simple Logout at Bottom */}
      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}

// NavItem with Link support
function NavItem({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 group">
      <span className="group-hover:text-indigo-600 transition-colors">{icon}</span>
      {label}
    </Link>
  );
}