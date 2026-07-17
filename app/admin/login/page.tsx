"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { adminLogin } from "@/app/actions/admin";
import Image from "next/image";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useFormState(
    async (_prev: unknown, formData: FormData) => {
      const result = await adminLogin(formData);
      return result;
    },
    null
  );

  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Jaacyy's Gadgets"
            width={180}
            height={80}
            className="object-contain rounded-[20px]"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-center w-14 h-14 bg-blue/20 rounded-full mx-auto mb-6">
            <LockKeyhole size={28} className="text-blue" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-1">Admin Login</h1>
          <p className="text-white/60 text-sm text-center mb-8">Sign in to your admin panel</p>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/80 text-sm font-medium">Username</label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Enter username"
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 outline-none focus:border-blue focus:bg-white/15 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/80 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 pr-12 outline-none focus:border-blue focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {state?.error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue hover:bg-mid-blue text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-[0_4px_15px_rgba(0,92,255,0.3)]"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-white/30 text-xs text-center mt-6">
          © {new Date().getFullYear()} Jaacyy&apos;s Gadgets Admin Panel
        </p>
      </div>
    </div>
  );
}
