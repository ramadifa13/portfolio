"use client";

import { createClient } from "@/lib/supabase/client";
import {
  Code2,
  Cpu,
  Database as DatabaseIcon,
  Layout,
  Sparkles,
  Terminal,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/types/database";

type Skill = Database["public"]["Tables"]["skills"]["Row"];
type SkillEntry = Pick<Skill, "id" | "name" | "category" | "proficiency">;

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillEntry[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const supabase = createClient();
      const { data } = await supabase
        .from("skills")
        .select("id,name,category,proficiency")
        .order("proficiency", { ascending: false });

      if (data) setSkills(data);
    }
    fetchSkills();
  }, []);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 max-w-3xl md:mb-24"
      >
        <h1 className="mb-6 text-4xl leading-tight font-black text-foreground sm:text-5xl md:mb-8 md:text-7xl">
          Technical{" "}
          <span className="text-sky-600 dark:text-indigo-400">Stack.</span>
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
          A comprehensive overview of my technical capabilities and the
          technologies I use to build robust, scalable applications.
        </p>
      </motion.div>

      <div className="space-y-14 md:space-y-24">
        {categories.map((category) => (
          <section key={category}>
            <div className="mb-8 flex items-center gap-4 md:mb-12">
              <h2 className="rounded-full border border-sky-500/20 bg-sky-500/8 px-4 py-1 text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-indigo-300 md:text-sm">
                {category}
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-sky-500/25 to-transparent dark:from-indigo-500/20"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
              {skills
                .filter((s) => s.category === category)
                .map((skill, idx) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-5 text-center backdrop-blur-sm transition-all hover:border-sky-500/30 hover:bg-card/90 md:p-8 dark:hover:border-indigo-500/30">
                      {/* Subtle Sparkle background */}
                      <div className="absolute -right-4 -top-4 text-sky-500/10 transition-colors group-hover:text-sky-500/20 dark:text-indigo-500/10 dark:group-hover:text-indigo-500/20">
                        <Sparkles size={80} />
                      </div>

                      <div className="mb-4 scale-110 rounded-2xl border border-border bg-background p-3 text-muted-foreground transition-all duration-500 group-hover:scale-125 group-hover:text-sky-600 md:mb-6 md:p-4 dark:group-hover:text-indigo-400">
                        {getCategoryIcon(category)}
                      </div>

                      <h3 className="mb-2 text-base font-black text-foreground md:text-lg">
                        {skill.name}
                      </h3>

                      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-background">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency ?? 0}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-linear-to-r from-sky-500 to-indigo-500"
                        />
                      </div>
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {skill.proficiency ?? 0}% Proficiency
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "frontend":
      return <Layout size={24} />;
    case "backend":
      return <DatabaseIcon size={24} />;
    case "devops":
      return <Cpu size={24} />;
    case "tools":
      return <Terminal size={24} />;
    default:
      return <Code2 size={24} />;
  }
}
