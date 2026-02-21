"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Github, Code2, Globe, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Database } from "@/types/database";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data) setProjects(data);
    }
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.tech_stack?.some((t: string) =>
        t.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-16 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          Selected <span className="text-indigo-400">Works.</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
          A collection of projects ranging from high-performance web
          applications to complex technical systems. Each one built with a focus
          on quality and innovation.
        </p>

        <div className="relative max-w-md pt-4">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />
          <Input
            placeholder="Search projects by name or technology..."
            className="h-14 pl-12 rounded-2xl bg-zinc-900/50 border-white/5 focus:border-indigo-500/50 transition-all text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group block"
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900/50 border border-white/5 transition-all duration-500 hover:border-indigo-500/30 hover:bg-zinc-900 group shadow-2xl">
                <div className="relative aspect-16/10 overflow-hidden">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                      <Code2 size={64} className="text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>

                <div className="p-10 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-white/5 border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-lg line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors"
                      >
                        <Globe size={16} /> Live Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-bold text-zinc-300 hover:text-white transition-colors"
                      >
                        <Github size={16} /> Repository
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
