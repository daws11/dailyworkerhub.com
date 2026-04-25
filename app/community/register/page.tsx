"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRateLimit } from "@/lib/ratelimit";
import { toast } from "sonner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { check: checkRateLimit, isLimited } = useRateLimit({
    identifier: email || "register-attempt",
  });

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit before registration attempt
    if (isLimited) {
      toast.error("Terlalu banyak percobaan", {
        description: "Silakan tunggu beberapa saat sebelum mencoba lagi.",
      });
      return;
    }

    const result = await checkRateLimit();
    if (result.status === "blocked") {
      toast.error("Terlalu banyak percobaan", {
        description: result.message,
      });
      return;
    }

    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Password tidak cocok", {
        description: "Pastikan password dan konfirmasi password sama.",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password terlalu pendek", {
        description: "Password minimal 6 karakter.",
      });
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      toast.error("Registrasi gagal", {
        description: error.message,
      });
    } else {
      toast.success("Registrasi berhasil", {
        description: "Silakan cek email untuk verifikasi.",
      });
    }
    setLoading(false);
  }, [email, password, username, confirmPassword, isLimited, checkRateLimit]);

  const handleGoogleRegister = useCallback(async () => {
    // Check rate limit before OAuth attempt
    if (isLimited) {
      toast.error("Terlalu banyak percobaan", {
        description: "Silakan tunggu beberapa saat sebelum mencoba lagi.",
      });
      return;
    }

    const result = await checkRateLimit();
    if (result.status === "blocked") {
      toast.error("Terlalu banyak percobaan", {
        description: result.message,
      });
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/community/auth/callback`,
      },
    });

    if (error) {
      toast.error("Registrasi gagal", {
        description: error.message,
      });
      setLoading(false);
    }
  }, [isLimited, checkRateLimit]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-slate-950 font-bold text-sm">DW</span>
          </div>
          <span className="font-semibold text-slate-50">DailyWorkerHub</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-50 mb-2">Buat Akun Baru</h1>
              <p className="text-slate-400 text-sm">
                Bergabung dengan komunitas pekerja harian Indonesia
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-50"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500"
                />
              </div>

              <div className="text-sm text-slate-400">
                Dengan mendaftar, Anda menyetujui{" "}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">Terms of Service</a>{" "}
                dan{" "}
                <a href="#" className="text-emerald-400 hover:text-emerald-300">Privacy Policy</a>
              </div>

              <Button
                type="submit"
                disabled={loading || isLimited}
                className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isLimited ? (
                  "Terlalu Banyak Percobaan"
                ) : (
                  "Daftar"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900 text-slate-500">atau</span>
              </div>
            </div>

            {/* Social Register */}
            <Button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading || isLimited}
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.29 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.71 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Daftar dengan Google
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-slate-400">
            Sudah punya akun?{" "}
            <a href="/community/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Masuk
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
