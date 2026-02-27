"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Camera, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import {
  signInUser,
  signUpUser,
  forgotPassword,
  resetPassword
} from "@/service/authService";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Determine current view
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";
  const isReset = mode === "reset";
  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      let result;

      // 1. LOGIN LOGIC (Handles Redis Lock/Attempts)
      if (isLogin) {
        result = await signInUser({ email: formData.email, password: formData.password });
        if (result.success) {
          login(result.user, result.token);
          router.push("/dashboard");
        } else {

          setErrorMessage(result.message);
        }
      }


      else if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("confirmPassword", formData.confirmPassword);
        if (file) data.append("profileImage", file);

        result = await signUpUser(data);
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      }


      else if (isForgot) {
        result = await forgotPassword(formData.email);
        setSuccessMessage("Email verified. Redirecting to reset page...");
        setTimeout(() => router.push("/reset-password"), 2000);
      }


      else if (isReset) {
        result = await resetPassword({ email: formData.email, newPassword: formData.password });
        setSuccessMessage("Password updated! Please login with your new password.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {

      const msg = err.response?.data?.message || err.message || "An error occurred";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-10 space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-indigo-600 tracking-tighter italic uppercase">Expense.it</h1>
          <p className="text-slate-500 font-bold mt-3 capitalize tracking-wide text-sm">
            {isSignup ? "Create account" : isForgot ? "Recover Password" : isReset ? "Set New Password" : "Welcome Back"}
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in zoom-in duration-300">
            <AlertCircle size={18} className="shrink-0" />
            <span className="font-semibold">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2 p-4 text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={18} className="shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">


          {isSignup && (
            <div className="flex justify-center mb-6">
              <label className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden group-hover:bg-slate-200 transition-all shadow-inner">
                  {file ? (
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <Camera className="text-slate-400 w-8 h-8" />
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>
          )}


          {isSignup && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text" placeholder="Username" required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          )}


          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email" placeholder="Email Address" required
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>


          {!isForgot && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password" placeholder={isReset ? "New Password" : "Password"} required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          )}


          {isSignup && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password" placeholder="Confirm Password" required
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>{mode} <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="text-center text-sm font-bold text-slate-400 pt-4">
          {isLogin ? (
            <div className="space-y-4">
              <Link href="/forgot-password" size="sm" className="text-slate-500 hover:text-indigo-600 transition-colors block">Forgot Password?</Link>
              <p>New here? <Link href="/signup" className="text-indigo-600 hover:underline decoration-2 underline-offset-4">Create Account</Link></p>
            </div>
          ) : (
            <p>Go back to <Link href="/login" className="text-indigo-600 hover:underline decoration-2 underline-offset-4">Login</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}