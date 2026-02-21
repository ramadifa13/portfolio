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

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const supabase = createClient();
      const { data } = await supabase
        .from("skills")
        .select("*")
        .order("proficiency", { ascending: false });

      if (data) setSkills(data);
    }
    fetchSkills();
  }, []);

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
          Technical <span className="text-indigo-400">Stack.</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          A comprehensive overview of my technical capabilities and the
          technologies I use to build robust, scalable applications.
        </p>
      </motion.div>

      <div className="space-y-24">
        {categories.map((category) => (
          <section key={category}>
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                {category}
              </h2>
              <div className="h-px bg-linear-to-r from-indigo-500/20 to-transparent flex-1"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                    <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:border-indigo-500/30 hover:bg-zinc-900 transition-all h-full relative overflow-hidden">
                      {/* Subtle Sparkle background */}
                      <div className="absolute -top-4 -right-4 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                        <Sparkles size={80} />
                      </div>

                      <div className="mb-6 p-4 rounded-2xl bg-black border border-white/5 text-zinc-500 group-hover:text-indigo-400 transition-all scale-110 group-hover:scale-125 duration-500">
                        {getCategoryIcon(category)}
                      </div>

                      <h3 className="font-black text-white text-lg mb-2">
                        {skill.name}
                      </h3>

                      <div className="w-full mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-linear-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                      <p className="mt-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {skill.proficiency}% Proficiency
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
