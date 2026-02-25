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

type Project = Pick<
  Database["public"]["Tables"]["projects"]["Row"],
  | "id"
  | "title"
  | "slug"
  | "description"
  | "tech_stack"
  | "image_url"
  | "live_url"
  | "repo_url"
  | "created_at"
  | "status"
>;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();
      const { data } = await supabase
        .from("projects")
        .select(
          "id,title,slug,description,tech_stack,image_url,live_url,repo_url,created_at,status",
        )
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
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 max-w-3xl space-y-5 md:mb-16 md:space-y-6"
      >
        <h1 className="text-4xl leading-tight font-black text-foreground sm:text-5xl md:text-7xl">
          Selected <span className="text-sky-600 dark:text-indigo-400">Works.</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
          A collection of projects ranging from high-performance web
          applications to complex technical systems. Each one built with a focus
          on quality and innovation.
        </p>

        <div className="relative max-w-md pt-2 md:pt-4">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            placeholder="Search projects by name or technology..."
            className="h-12 rounded-2xl border-border/70 bg-card/75 pl-12 text-foreground transition-all focus:border-sky-500/50 md:h-14"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
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
              <div className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 shadow-xl transition-all duration-500 hover:border-sky-500/30 hover:bg-card/90 md:rounded-[2.5rem]">
                <div className="relative aspect-16/10 overflow-hidden">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-background">
                      <Code2 size={56} className="text-muted-foreground/45" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                </div>

                <div className="space-y-5 p-6 md:space-y-6 md:p-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-border bg-background/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-indigo-400 md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 text-base leading-relaxed text-muted-foreground md:text-lg">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 border-t border-border/70 pt-4 md:gap-6">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Globe size={16} /> Live Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
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
