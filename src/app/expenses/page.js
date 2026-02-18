"use client";
import { useState, useEffect } from "react";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "@/service/expenseService";
import { getCategories } from "@/service/categoryService";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  Plus, Trash2, Edit2, Check, X, Loader2, 
  ReceiptIndianRupee, Calendar, Tag, AlignLeft, Wallet 
} from "lucide-react";

export default function ExpensePage() {
  const { token } = useAuthStore();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // States for Editing
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "", amount: "", categoryId: "", description: "", date: ""
  });

  // State for Adding
  const [formData, setFormData] = useState({
    title: "", amount: "", categoryId: "", description: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => { setMounted(true); }, []);

  const fetchData = async () => {
    if (!token) return;
    const [expData, catData] = await Promise.all([
      getExpenses(token),
      getCategories(token)
    ]);
    if (expData.success) setExpenses(expData.expenses);
    if (catData.success) setCategories(catData.category);
  };

  useEffect(() => {
    if (mounted && token) fetchData();
  }, [mounted, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) return alert("Please select a category!");
    setLoading(true);
    const res = await createExpense(formData, token);
    if (res.success) {
      setFormData({ 
        title: "", amount: "", categoryId: "", 
        description: "", date: new Date().toISOString().split("T")[0] 
      });
      fetchData();
    }
    setLoading(false);
  };

  const handleUpdate = async (id) => {
    const res = await updateExpense(id, editData, token);
    if (res.success) {
      setEditId(null);
      fetchData();
    } else {
      alert(res.error || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      const res = await deleteExpense(id, token);
      if (res.success) fetchData();
    }
  };

  const totalAmount = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Stats Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Expenses</h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Track your daily spending</p>
          </div>
          <div className="bg-indigo-600 p-6 rounded-[2rem] text-white flex items-center gap-4 shadow-xl shadow-indigo-200">
            <div className="p-3 bg-white/20 rounded-2xl"><Wallet size={24}/></div>
            <div>
              <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">Total Spent</p>
              <h2 className="text-2xl font-black">₹{totalAmount.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Title</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500"
                placeholder="Title" required value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Amount (₹)</label>
              <input 
                type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500"
                placeholder="0" required value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</label>
              <select 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500 appearance-none"
                value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Date</label>
              <input 
                type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500"
                value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Note (Optional)</label>
              <input 
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500"
                placeholder="Extra details" value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button 
                type="submit" disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all uppercase text-xs tracking-widest"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18}/> Add Expense</>}
              </button>
            </div>
          </form>
        </div>

        {/* Expenses List */}
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <div className="bg-white p-20 text-center rounded-[3rem] border border-dashed border-slate-300 text-slate-400 font-bold uppercase">No records found.</div>
          ) : (
            expenses.map((exp) => (
              <div key={exp._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-indigo-100">
                {editId === exp._id ? (
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <input className="p-3 bg-slate-50 border rounded-xl text-sm font-bold" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})}/>
                    <input type="number" className="p-3 bg-slate-50 border rounded-xl text-sm font-bold" value={editData.amount} onChange={(e) => setEditData({...editData, amount: e.target.value})}/>
                    <select className="p-3 bg-slate-50 border rounded-xl text-sm font-bold" value={editData.categoryId} onChange={(e) => setEditData({...editData, categoryId: e.target.value})}>
                      {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    <input type="date" className="p-3 bg-slate-50 border rounded-xl text-sm font-bold" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})}/>
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(exp._id)} className="flex-1 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors"><Check size={20}/></button>
                      <button onClick={() => setEditId(null)} className="flex-1 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-300 transition-colors"><X size={20}/></button>
                    </div>
                  </div>
                ) : (
                  /* DISPLAY MODE ROW (Always Visible Buttons) */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <ReceiptIndianRupee size={22} />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 italic uppercase leading-none mb-1">{exp.title}</h3>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md uppercase">{exp.categoryId?.name || "Uncategorized"}</span>
                          <span className="text-[10px] font-bold text-slate-400 tracking-tight">{new Date(exp.date).toLocaleDateString('en-GB')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-900 leading-none">₹{exp.amount}</p>
                        <p className="text-[10px] font-bold text-slate-400 truncate max-w-[120px]">{exp.description || "No note"}</p>
                      </div>
                      
                      {/* Action Buttons: Visible by default */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setEditId(exp._id);
                            setEditData({
                              title: exp.title, 
                              amount: exp.amount, 
                              categoryId: exp.categoryId?._id || "", 
                              description: exp.description || "",
                              date: exp.date.split('T')[0]
                            });
                          }}
                          className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(exp._id)} 
                          className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}