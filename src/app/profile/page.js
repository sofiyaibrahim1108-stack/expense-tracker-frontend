"use client";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Camera, Save, Loader2, User } from "lucide-react";

export default function ProfilePage() {
  const { user, token, setUser } = useAuthStore();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (user) setUsername(user.username || "");
  }, [user]);

  if (!mounted) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const selectedFile = fileInputRef.current.files[0];

    
    // 1. if name only append
    if (username !== user?.username) {
      formData.append("username", username);
    }

    // 2.if select new image only append
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    
    if (!formData.has("username") && !formData.has("profileImage")) {
      setLoading(false);
      return alert("No changes detected!");
    }

    try {
      const res = await fetch("http://localhost:3005/api/updateprofile", {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user); 
        setPreview(null);
        alert("Profile Updated!");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center items-start">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-slate-100">
        
        <form onSubmit={handleUpdate} className="space-y-8">
         
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center text-slate-300">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" alt="preview" />
                ) : user?.profileImage ? (
                  <img 
                    src={`http://localhost:3005/uploads/${user.profileImage}`} 
                    className="w-full h-full object-cover" 
                    alt="profile"
                  />
                ) : (
                  <User size={50} />
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 p-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl"
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" ref={fileInputRef} hidden accept="image/*" 
                onChange={(e) => {
                  if(e.target.files[0]) setPreview(URL.createObjectURL(e.target.files[0]));
                }} 
              />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              {user?.email}
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Username</label>
              <input 
                className="w-full p-5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}