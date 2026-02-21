"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Terminal, Rocket, Code2, LucideIcon, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data } = await supabase.from("profiles").select("*").single();
      if (data) setProfile(data);
    }
    fetchProfile();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <div className="grid gap-20 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="bg-indigo-500/10 border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]"
              >
                The Creator
              </Badge>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
              Crafting <br />
              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              <br />
              <span className="text-white">Masterpieces.</span>
            </h1>
          </div>

          <div className="space-y-8 text-xl text-zinc-400 leading-relaxed font-medium max-w-xl">
            {profile?.bio ? (
              <div className="whitespace-pre-wrap">{profile.bio}</div>
            ) : (
              <p>
                I am a Senior Fullstack Engineer specializing in building
                high-performance digital products. My approach combines
                technical excellence with a deep understanding of product
                growth.
              </p>
            )}
            {!profile?.bio && (
              <>
                <p>
                  Throughout my career, I&apos;ve led engineering teams at
                  high-growth startups and contributed to enterprise-scale
                  systems. I thrive at the intersection of complex backend
                  architectures and highly polished user interfaces.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AboutMetric
              icon={Terminal}
              title="Clean Code"
              desc="Scaleable & maintained."
              color="indigo"
            />
            <AboutMetric
              icon={Rocket}
              title="Performance"
              desc="Built for speed."
              color="emerald"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-10 border border-white/5 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
          <div className="absolute -inset-20 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none opacity-50"></div>

          <div className="aspect-4/5 rounded-[4rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group relative">
            <div className="absolute inset-0 bg-[#0c0c0e]">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_70%)] opacity-50"></div>
            </div>

            <div className="absolute inset-0 z-10 p-12 flex flex-col justify-end">
              <div className="space-y-8">
                <div className="flex gap-3">
                  {["Senior", "Fullstack", "Architect"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-4xl font-black text-white italic leading-none">
                  &quot;Turning complex <br /> logic into <br />{" "}
                  <span className="text-indigo-400">elegant art.&quot;</span>
                </h2>

                <div className="pt-8 border-t border-white/10 flex items-center justify-between"></div>
              </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150">
              <Code2 size={400} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <section className="mt-40 space-y-16">
        <div className="flex items-center gap-6">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500">
            My Principles
          </h2>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <PrincipleCard
            icon={Terminal}
            title="Readability over Cleverness"
            text="Code is read much more often than it is written. I prioritize maintainability for future developers."
          />
          <PrincipleCard
            icon={Rocket}
            title="User-First Engineering"
            text="Technology serves the user. Every technical decision must ultimately improve the user experience."
          />
          <PrincipleCard
            icon={Sparkles}
            title="Continuous Evolution"
            text="The digital landscape changes daily. Constant learning and adaptation are my default state."
          />
        </div>
      </section>
    </div>
  );
}

function AboutMetric({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: "indigo" | "emerald";
}) {
  const colors = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div
      className={`p-8 rounded-4xl border bg-zinc-900/40 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-500 ${(colors as any)[color]}`}
    >
      <Icon
        size={32}
        className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <h3 className="text-white font-black text-lg mb-1">{title}</h3>
      <p className="text-zinc-500 text-sm font-medium">{desc}</p>
    </div>
  );
}

function PrincipleCard({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 transition-all group"
    >
      <div className="mb-10 w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-indigo-400 border border-white/5 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-black text-white mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-zinc-400 leading-relaxed font-medium">{text}</p>
    </motion.div>
  );
}
