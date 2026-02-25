"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Authentication failed. Please check your credentials.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

        {/* Subtle Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.05]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Portfolio{" "}
              <span className="bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                CMS
              </span>
            </h1>
            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">
              Authentication Gateway
            </p>
          </div>
        </div>

        <Card className="border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-2xl overflow-hidden rounded-[2.5rem]">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-emerald-500"></div>

          <CardHeader className="space-y-2 p-10 pb-4">
            <CardTitle className="text-xl font-black text-white tracking-tight leading-none">
              Access Console
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium text-sm">
              Synchronize your credentials to continue.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 p-10 pt-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-rose-500/10 p-4 text-xs font-bold text-rose-400 border border-rose-500/20 text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="space-y-2 group">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
                  >
                    Terminal ID (Email)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="operator@system.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-950/50 border-white/5 h-12 focus:border-indigo-500/50 focus:ring-0 rounded-2xl transition-all"
                  />
                </div>

                <div className="space-y-2 group">
                  <Label
                    htmlFor="password"
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
                  >
                    Access Key (Password)
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-zinc-950/50 border-white/5 h-12 focus:border-indigo-500/50 focus:ring-0 rounded-2xl transition-all"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-10 pt-0">
              <Button
                type="submit"
                className="w-full h-14 bg-white text-zinc-950 hover:bg-zinc-200 font-black rounded-2xl transition-all active:scale-95 shadow-xl shadow-white/5 group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Synchronizing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span>Initialize Session</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        
      </motion.div>
    </div>
  );
}
