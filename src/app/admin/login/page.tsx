"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react";
import Logo from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid username or password. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1710] via-[#0e2016] to-[#081109] flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute -top-20 -left-20 w-96 h-96 bg-[#0e2016]/30 rounded-full" />
        <div className="animate-float absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-[#11271b] rounded-3xl shadow-2xl border border-slate-100 dark:border-[#16331f] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" href={undefined} priority />
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <Shield className="w-5 h-5 text-[var(--gold)]" />
              <h1 className="text-xl font-black text-gray-900 dark:text-white">Admin Portal</h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sign in to manage your dashboard</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full pl-10 pr-11 py-3.5 rounded-xl border border-gray-200 dark:border-[#16331f] bg-white dark:bg-[#0c1a12] text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-amber-500/20 transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--gold)] hover:bg-[var(--gold-hover)] disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-900/30"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Lock className="w-3 h-3" /> Secure access · authorised personnel only
          </p>
        </div>

        <p className="text-center text-xs text-[var(--gold)]/60 mt-4">
          © {new Date().getFullYear()} Sigiro Construction & General Supplies. Admin access only.
        </p>
      </div>
    </div>
  );
}
