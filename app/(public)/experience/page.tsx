"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/types/database";

type Experience = Database["public"]["Tables"]["experience"]["Row"];

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);

  useEffect(() => {
    async function fetchExperience() {
      const supabase = createClient();
      const { data } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });

      if (data) setExperience(data);
    }
    fetchExperience();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
          Career <span className="text-indigo-400">Path.</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          A timeline of my professional journey, contributions, and growth as a
          software engineer across various industries and teams.
        </p>
      </motion.div>

      <div className="relative space-y-12">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-linear-to-b from-indigo-500/50 via-zinc-800 to-transparent md:left-1/2"></div>

        {experience.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row gap-8 relative ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline Node */}
            <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border-2 border-indigo-500 z-10 shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>

            {/* Content Side */}
            <div
              className={`w-full md:w-[45%] ${idx % 2 === 0 ? "text-left" : "md:text-left"}`}
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-4xl p-10 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Briefcase size={80} />
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
                    <Calendar size={14} />
                    {item.start_date
                      ? new Date(String(item.start_date)).getFullYear()
                      : "N/A"}{" "}
                    —{" "}
                    {item.is_current
                      ? "Present"
                      : item.end_date
                        ? new Date(String(item.end_date)).getFullYear()
                        : "N/A"}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                      <MapPin size={14} />
                      {item.location}
                    </div>
                  )}
                </div>

                <h3 className="text-3xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {item.position}
                </h3>
                <p className="text-xl font-bold text-zinc-300 mb-6">
                  {item.company}
                </p>

                <p className="text-zinc-400 leading-relaxed mb-8 text-lg">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies?.map((tech: string) => (
                    <Badge
                      key={tech}
                      className="bg-white/5 border-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Empty Side (Desktop only) */}
            <div className="hidden md:block w-[45%]"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
