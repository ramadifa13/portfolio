"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Command, Layout, Globe, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  status: string;
  featured: boolean;
  created_at: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  featured: boolean;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .eq("featured", true)
        .limit(3);

      const { data: skillsData } = await supabase
        .from("skills")
        .select("*")
        .eq("featured", true)
        .limit(8);

      if (projectsData) setProjects(projectsData as Project[]);
      if (skillsData) setSkills(skillsData as Skill[]);
    }
    fetchData();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="space-y-40 pb-20 relative">
     
      <section className="relative pt-32 pb-24 md:pt-56 md:pb-40 overflow-hidden">
        {/* Central Aura Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[180px] z-0 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-sm font-black uppercase tracking-[0.2em] backdrop-blur-md shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
                Ramadifa Esa Putra
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-[6rem] font-black tracking-tight mb-8 leading-[0.95] text-white"
            >
              Hi, I'm <span className="text-indigo-400">Ramadifa Esa Putra</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                Software Engineer & Solution Architect
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
            >
              Welcome to my professional portfolio. I specialize in building high-performance, scalable web applications and digital solutions with a focus on clean architecture, reliability, and impactful user experiences. Explore my work, skills, and journey in the world of technology.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/projects">
                <Button className="h-20 px-12 rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 text-xl font-black shadow-2xl transition-all active:scale-95 flex items-center gap-4 group">
                  View Projects
                  <ArrowRight
                    size={24}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-20 px-12 rounded-2xl border-indigo-500/30 bg-zinc-900/40 backdrop-blur-md text-xl font-black hover:bg-zinc-800 transition-all text-white active:scale-95"
                >
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects - Enhanced Contrast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <Badge
              variant="outline"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5"
            >
              Strategic Assets
            </Badge>
            <h3 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
              Selected <br />{" "}
              <span className="text-zinc-500">Masterpieces.</span>
            </h3>
          </div>
          <Link
            href="/projects"
            className="text-zinc-400 hover:text-white transition-all flex items-center gap-3 font-black uppercase text-xs tracking-[0.2em] group border-b border-zinc-800 pb-2"
          >
            Vault Access{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group"
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="relative aspect-4/5 rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900 group-hover:border-indigo-500/40 transition-all duration-500 shadow-2xl group-hover:shadow-indigo-500/10">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                      <Command size={64} className="text-zinc-800" />
                    </div>
                  )}
                  {/* Immersive Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>

                  <div className="absolute bottom-8 left-8 right-8 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-2">
                      {project.tech_stack?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="text-[9px] font-black uppercase tracking-widest text-zinc-300 bg-white/5 backdrop-blur-xl px-3 py-1 rounded-lg border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-3xl font-black text-white tracking-tighter">
                        {project.title}
                      </h4>
                      <p className="text-zinc-400 text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expertise Section - Halo Effect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        {/* Halo Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/3 rounded-full blur-[200px] pointer-events-none"></div>

        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 space-y-10">
            <div className="inline-flex p-4 rounded-3xl bg-zinc-900 border border-white/10 text-emerald-400 shadow-xl shadow-emerald-500/10">
              <Cpu size={32} />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Tech <br /> <span className="text-zinc-500">Architecture.</span>
              </h2>
              <p className="text-zinc-400 text-xl leading-relaxed font-medium">
                Engineered for speed, optimized for scale. I leverage the most
                powerful modern stacks to build robust digital infrastructures.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2 group">
                <p className="text-5xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter">
                  8+
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Years Command
                </p>
              </div>
              <div className="space-y-2 group">
                <p className="text-5xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tighter">
                  100%
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Uptime Focused
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-4xl flex flex-col items-center justify-center text-center hover:border-emerald-500/40 hover:bg-zinc-900/60 transition-all duration-500 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all mb-6">
                  <Layout size={20} />
                </div>
                <p className="font-black text-white text-xs uppercase tracking-widest">
                  {skill.name}
                </p>
                <div className="w-full bg-zinc-950 h-0.5 mt-4 rounded-full overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity">
                  <div
                    className="bg-emerald-500 h-full w-0 group-hover:w-full transition-all duration-700"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section - High Vibrancy Redesign */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-900 rounded-[3.5rem] p-12 md:p-32 text-center relative overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.3)]"
        >
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 space-y-12">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Mission Brief
              </Badge>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.8]">
                Ready to <br />
                <span className="opacity-60 italic">Escalate?</span>
              </h2>
            </div>

            <p className="text-indigo-100/70 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Currently taking on select high-impact projects. If you have a
              bold vision, let&apos;s build the definitive solution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
              <Link href="/contact">
                <Button className="h-20 px-16 rounded-3xl bg-white text-indigo-700 hover:bg-zinc-100 text-2xl font-black transition-all active:scale-95 shadow-2xl">
                  Launch Project
                </Button>
              </Link>
              <div className="flex gap-6 items-center">
                <a
                  href="#"
                  className="w-16 h-16 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/30 transition-all text-white group"
                >
                  <Github
                    size={28}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="#"
                  className="w-16 h-16 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/30 transition-all text-white group"
                >
                  <Globe
                    size={28}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
