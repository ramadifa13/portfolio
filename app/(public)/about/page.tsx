"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Terminal, Rocket, Code2, LucideIcon, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type AboutProfile = Pick<Profile, "bio">;

export default function AboutPage() {
  const [profile, setProfile] = useState<AboutProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("bio")
        .single();
      if (data) setProfile(data);
    }
    fetchProfile();
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 md:space-y-12"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                variant="outline"
                className="rounded-full border-sky-500/20 bg-sky-500/8 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-sky-600 dark:text-indigo-300"
              >
                The Creator
              </Badge>
            </motion.div>
            <h1 className="text-4xl leading-[0.95] font-black tracking-tighter text-foreground sm:text-6xl md:text-8xl">
              Crafting <br />
              <span className="bg-linear-to-r from-sky-500 via-indigo-400 to-emerald-500 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              <br />
              <span className="text-foreground">Masterpieces.</span>
            </h1>
          </div>

          <div className="max-w-xl space-y-6 text-base leading-relaxed font-medium text-muted-foreground md:space-y-8 md:text-xl">
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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
          <div className="pointer-events-none absolute -inset-10 rounded-full border border-border/50 motion-safe:animate-[spin_20s_linear_infinite]"></div>
          <div className="pointer-events-none absolute -inset-20 rounded-full border border-border/45 opacity-50 motion-safe:animate-[spin_30s_linear_infinite_reverse]"></div>

          <div className="group relative aspect-4/5 overflow-hidden rounded-[2.6rem] border border-border/60 bg-card shadow-2xl md:rounded-[4rem]">
            <div className="absolute inset-0 bg-background">
              <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.16),transparent_70%)] opacity-50"></div>
            </div>

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-7 md:p-12">
              <div className="space-y-8">
                <div className="flex gap-3">
                  {["Senior", "Fullstack", "Architect"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-600 backdrop-blur-md dark:text-indigo-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl leading-none font-black italic text-foreground md:text-4xl">
                  &quot;Turning complex <br /> logic into <br />{" "}
                  <span className="text-sky-600 dark:text-indigo-400">
                    elegant art.&quot;
                  </span>
                </h2>

                <div className="flex items-center justify-between border-t border-border/60 pt-8"></div>
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
      <section className="mt-20 space-y-10 md:mt-40 md:space-y-16">
        <div className="flex items-center gap-6">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground md:text-sm">
            My Principles
          </h2>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-8">
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
  const colors: Record<"indigo" | "emerald", string> = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div
      className={`group rounded-4xl border bg-card/70 p-6 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02] md:p-8 ${colors[color]}`}
    >
      <Icon
        size={32}
        className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <h3 className="mb-1 text-lg font-black text-foreground">{title}</h3>
      <p className="text-sm font-medium text-muted-foreground">{desc}</p>
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
      className="group rounded-[2rem] border border-border/70 bg-card/70 p-7 transition-all hover:border-sky-500/30 md:rounded-[2.5rem] md:p-10 dark:hover:border-indigo-500/30"
    >
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-sky-600 transition-all group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] dark:text-indigo-400 md:mb-10 md:h-14 md:w-14">
        <Icon size={24} />
      </div>
      <h3 className="mb-4 text-xl leading-tight font-black text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="font-medium leading-relaxed text-muted-foreground">{text}</p>
    </motion.div>
  );
}
