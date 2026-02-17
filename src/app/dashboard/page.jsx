import { Wallet, CreditCard, PieChart, ArrowUpRight, Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 font-medium">Welcome back! Manage your spending efficiently.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-indigo-200">
          <Plus size={20} />
          New Transaction
        </button>
      </div>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Balance" amount="₹45,000" icon={<Wallet />} color="text-indigo-600" bg="bg-indigo-50" trend="+2.5%" />
        <StatCard title="Total Expenses" amount="₹18,200" icon={<CreditCard />} color="text-rose-600" bg="bg-rose-50" trend="+12%" isLoss />
        <StatCard title="Categories" amount="12" icon={<PieChart />} color="text-amber-600" bg="bg-amber-50" trend="Stable" />
      </div>

      {/* Professional Transaction Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="font-bold text-slate-800 text-lg">Recent Activity</h3>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1 bg-indigo-50 rounded-lg">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-4">Title</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <TableRow title="Food & Drinks" category="Daily" amount="₹250" date="Today, 2:30 PM" />
              <TableRow title="Netflix Subscription" category="Entertainment" amount="₹499" date="Yesterday" />
              <TableRow title="House Rent" category="Housing" amount="₹12,000" date="1 Feb 2024" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Sub-components for better organization
function StatCard({ title, amount, icon, color, bg, trend, isLoss }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div className={`p-3 ${bg} ${color} rounded-xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${isLoss ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {trend}
        </span>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{title}</p>
        <h2 className="text-3xl font-black text-slate-900 mt-1">{amount}</h2>
      </div>
    </div>
  );
}

function TableRow({ title, category, amount, date }) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-8 py-5">
        <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</p>
        <p className="text-xs text-slate-400 font-medium">{date}</p>
      </td>
      <td className="px-8 py-5">
        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200">
          {category}
        </span>
      </td>
      <td className="px-8 py-5 text-right font-black text-slate-900">{amount}</td>
    </tr>
  );
}