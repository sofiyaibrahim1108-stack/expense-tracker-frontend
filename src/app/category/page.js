"use client";
import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/service/categoryService";
import { useAuthStore } from "@/store/useAuthStore";
import { Edit2, Trash2, Check, X, Plus, Loader2, FolderPlus, AlignLeft } from "lucide-react";

export default function CategoryPage() {
  const { token } = useAuthStore();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // Hydration safety
  
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });

 
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Fetch Categories
  const fetchAll = async () => {
    if (!token) return;
    const data = await getCategories(token);
    if (data.success) {
      setCategories(data.category);
    }
  };

  useEffect(() => {
    if (mounted && token) {
      fetchAll();
    }
  }, [mounted, token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Name is required!");
    
    setLoading(true);
    const res = await createCategory(formData, token);
    if (res.success) {
      setFormData({ name: "", description: "" });
      fetchAll();
    } else {
      alert(res.error || "Failed to add category");
    }
    setLoading(false);
  };

  const handleUpdate = async (id) => {
    const res = await updateCategory(id, editData, token);
    if (res.success) {
      setEditId(null);
      fetchAll();
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const res = await deleteCategory(id, token);
      if (res.success) fetchAll();
    }
  };

  
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Categories</h1>
          <p className="text-slate-500 font-bold text-sm">Manage your expense types and details</p>
        </div>

        {/* Add Category Form */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-100">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FolderPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" placeholder="Category Name (e.g. Food)" 
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" placeholder="Description (Optional)" 
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium focus:ring-2 focus:ring-indigo-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Plus size={18}/> Add Category</>}
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-xs font-black uppercase text-slate-400">Name</th>
                <th className="p-6 text-xs font-black uppercase text-slate-400">Description</th>
                <th className="p-6 text-xs font-black uppercase text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-slate-400 font-bold">No categories found. Start by adding one!</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id} className="group hover:bg-slate-50">
                    <td className="p-6">
                      {editId === cat._id ? (
                        <input 
                          className="w-full p-2 border-2 border-indigo-500 rounded-xl font-bold"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                        />
                      ) : (
                        <span className="font-bold text-slate-700 uppercase italic">{cat.name}</span>
                      )}
                    </td>
                    <td className="p-6">
                      {editId === cat._id ? (
                        <input 
                          className="w-full p-2 border-2 border-indigo-500 rounded-xl"
                          value={editData.description}
                          onChange={(e) => setEditData({...editData, description: e.target.value})}
                        />
                      ) : (
                        <span className="text-slate-500 font-medium">{cat.description || "—"}</span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {editId === cat._id ? (
                          <>
                            <button onClick={() => handleUpdate(cat._id)} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><Check size={20}/></button>
                            <button onClick={() => setEditId(null)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><X size={20}/></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setEditId(cat._id); setEditData({ name: cat.name, description: cat.description }); }} className="p-2 bg-slate-100 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><Edit2 size={18}/></button>
                            <button onClick={() => handleDelete(cat._id)} className="p-2 bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18}/></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}