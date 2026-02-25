"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/types/database";

type Experience = Database["public"]["Tables"]["experience"]["Row"];
type ExperienceEntry = Pick<
  Experience,
  | "id"
  | "company"
  | "position"
  | "location"
  | "start_date"
  | "end_date"
  | "description"
  | "is_current"
  | "technologies"
>;

export default function ExperiencePage() {
  const [experience, setExperience] = useState<ExperienceEntry[]>([]);

  useEffect(() => {
    async function fetchExperience() {
      const supabase = createClient();
      const { data } = await supabase
        .from("experience")
        .select(
          "id,company,position,location,start_date,end_date,description,is_current,technologies",
        )
        .order("start_date", { ascending: false });

      if (data) setExperience(data);
    }
    fetchExperience();
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 max-w-3xl md:mb-24"
      >
        <h1 className="mb-6 text-4xl leading-tight font-black text-foreground sm:text-5xl md:mb-8 md:text-7xl">
          Career <span className="text-sky-600 dark:text-indigo-400">Path.</span>
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
          A timeline of my professional journey, contributions, and growth as a
          software engineer across various industries and teams.
        </p>
      </motion.div>

      <div className="relative space-y-8 md:space-y-12">
        <div className="absolute bottom-4 left-[19px] top-4 w-px bg-linear-to-b from-sky-500/45 via-border to-transparent md:left-1/2"></div>

        {experience.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col gap-6 md:flex-row md:gap-8 ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="absolute left-[13px] z-10 h-3.5 w-3.5 rounded-full border-2 border-sky-500 bg-background shadow-[0_0_12px_rgba(14,165,233,0.4)] md:left-1/2 md:-translate-x-1/2 dark:border-indigo-400 dark:shadow-[0_0_15px_rgba(99,102,241,0.45)]"></div>

            <div
              className={`w-full pl-10 md:w-[45%] md:pl-0 ${
                idx % 2 === 0 ? "text-left" : "md:text-left"
              }`}
            >
              <div className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/72 p-6 backdrop-blur-sm transition-all hover:border-sky-500/30 md:rounded-4xl md:p-10 dark:hover:border-indigo-500/30">
                <div className="absolute right-0 top-0 p-5 opacity-5 transition-opacity group-hover:opacity-15 md:p-6">
                  <Briefcase size={80} />
                </div>

                <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-6 md:gap-x-6">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-sky-600 dark:text-indigo-400">
                    <Calendar size={14} />
                    {item.start_date
                      ? new Date(String(item.start_date)).getFullYear()
                      : "N/A"}{" "}
                    -{" "}
                    {item.is_current
                      ? "Present"
                      : item.end_date
                        ? new Date(String(item.end_date)).getFullYear()
                        : "N/A"}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MapPin size={14} />
                      {item.location}
                    </div>
                  )}
                </div>

                <h3 className="mb-2 text-2xl font-black text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-indigo-400 md:text-3xl">
                  {item.position}
                </h3>
                <p className="mb-5 text-lg font-bold text-muted-foreground md:mb-6 md:text-xl">
                  {item.company}
                </p>

                <p className="mb-6 text-base leading-relaxed text-muted-foreground md:mb-8 md:text-lg">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.technologies?.map((tech: string) => (
                    <Badge
                      key={tech}
                      className="border-border bg-background/55 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden w-[45%] md:block"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
