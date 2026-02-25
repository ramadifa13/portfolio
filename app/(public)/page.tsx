"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Github,
  Command,
  Layout,
  Globe,
  Cpu,
  Award,
  ExternalLink,
} from "lucide-react";
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

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
}

interface Profile {
  full_name: string | null;
  title: string | null;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: projectsData } = await supabase
        .from("projects")
        .select(
          "id,title,slug,description,image_url,tech_stack,status,featured,created_at",
        )
        .eq("status", "published")
        .eq("featured", true)
        .limit(3);

      const { data: skillsData } = await supabase
        .from("skills")
        .select("id,name,category,proficiency,featured")
        .eq("featured", true)
        .limit(8);

      const { data: certsData } = await supabase
        .from("certifications")
        .select("id,name,issuer,issue_date,credential_url")
        .order("issue_date", { ascending: false })
        .limit(3);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name,title")
        .maybeSingle();

      if (projectsData) setProjects(projectsData as Project[]);
      if (skillsData) setSkills(skillsData as Skill[]);
      if (certsData) setCertifications(certsData as Certification[]);
      if (profileData) setProfile(profileData as Profile);
    }
    fetchData();
  }, []);

  const displayName = profile?.full_name?.trim() || "Ramadifa Esa Putra";
  const displayTitle =
    profile?.title?.trim() || "Software Engineer & Solution Architect";

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
    <div className="relative space-y-24 pb-14 md:space-y-36 md:pb-20">
      <section className="relative overflow-hidden pb-20 pt-24 md:pb-32 md:pt-48">
        {/* Central Aura Effect */}
        <div className="motion-safe:animate-pulse-slow absolute left-1/2 top-1/2 z-0 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[170px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center md:mb-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/8 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-600 shadow-[0_0_20px_rgba(56,189,248,0.1)] backdrop-blur-md dark:text-sky-300 sm:px-6 sm:text-sm">
                <div className="h-1.5 w-1.5 animate-ping rounded-full bg-sky-500"></div>
                {displayName}
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl leading-[0.95] font-black tracking-tight text-foreground sm:text-5xl md:mb-8 md:text-[5.5rem]"
            >
              <span className="bg-gradient-to-r from-sky-500 via-indigo-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                {displayTitle}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mb-10 max-w-3xl text-base leading-relaxed font-medium text-muted-foreground sm:text-lg md:mb-14 md:text-2xl"
            >
              Welcome to my professional portfolio. I specialize in building high-performance, scalable web applications and digital solutions with a focus on clean architecture, reliability, and impactful user experiences. Explore my work, skills, and journey in the world of technology.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <Link href="/projects" className="mx-auto sm:mx-0">
                <Button className="group flex h-14 items-center gap-3 rounded-2xl bg-indigo-600 px-8 text-base font-black text-white shadow-xl transition-all active:scale-95 hover:bg-indigo-500 sm:h-16 sm:px-10 sm:text-lg">
                  View Projects
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/contact" className="mx-auto sm:mx-0">
                <Button
                  variant="outline"
                  className="h-14 rounded-2xl border-border bg-card/70 px-8 text-base font-black text-foreground backdrop-blur-md transition-all active:scale-95 hover:bg-accent/70 sm:h-16 sm:px-10 sm:text-lg"
                >
                  Contact Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects - Enhanced Contrast */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="space-y-4">
            <Badge
              variant="outline"
              className="border-sky-500/25 bg-sky-500/8 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300"
            >
              Strategic Assets
            </Badge>
            <h3 className="text-3xl leading-[0.9] font-black tracking-tight text-foreground sm:text-5xl md:text-7xl">
              Selected <br />{" "}
              <span className="text-muted-foreground">Masterpieces.</span>
            </h3>
          </div>
          <Link
            href="/projects"
            className="group self-center md:self-auto flex items-center gap-3 border-b border-border pb-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground transition-all hover:text-foreground"
          >
            Vault Access{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
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
                <div className="relative aspect-4/5 overflow-hidden rounded-[2.2rem] border border-border/70 bg-card/65 shadow-xl transition-all duration-500 group-hover:border-sky-500/40 group-hover:shadow-sky-500/10 md:rounded-[2.5rem]">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-background">
                      <Command size={56} className="text-muted-foreground/40" />
                    </div>
                  )}
                  {/* Immersive Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/38 to-transparent opacity-85 transition-opacity group-hover:opacity-65 dark:from-zinc-950 dark:via-zinc-950/40"></div>

                  <div className="absolute bottom-6 left-6 right-6 space-y-3 transition-transform duration-500 group-hover:translate-y-0 md:bottom-8 md:left-8 md:right-8 md:space-y-4 md:translate-y-4">
                    <div className="flex gap-2">
                      {project.tech_stack?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-100 backdrop-blur-xl md:px-3"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black tracking-tighter text-white md:text-3xl">
                        {project.title}
                      </h4>
                      <p className="line-clamp-2 text-sm font-medium text-zinc-200 opacity-0 transition-opacity delay-100 duration-700 group-hover:opacity-100">
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
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Halo Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/4 blur-[190px]"></div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-8 lg:col-span-5 lg:space-y-10">
            <div className="inline-flex rounded-3xl border border-border bg-card p-4 text-emerald-500 shadow-xl shadow-emerald-500/10">
              <Cpu size={32} />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl leading-[0.9] font-black tracking-tight text-foreground sm:text-5xl md:text-7xl">
                Tech <br />{" "}
                <span className="text-muted-foreground">Architecture.</span>
              </h2>
              <p className="text-base leading-relaxed font-medium text-muted-foreground md:text-xl">
                Engineered for speed, optimized for scale. I leverage the most
                powerful modern stacks to build robust digital infrastructures.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4 md:gap-8 md:pt-6">
              <div className="space-y-2 group">
                <p className="text-4xl font-black tracking-tighter text-foreground transition-colors group-hover:text-sky-500 sm:text-5xl">
                  8+
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Years Command
                </p>
              </div>
              <div className="space-y-2 group">
                <p className="text-4xl font-black tracking-tighter text-foreground transition-colors group-hover:text-emerald-500 sm:text-5xl">
                  100%
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Uptime Focused
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6 lg:col-span-7">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group flex flex-col items-center justify-center rounded-4xl border border-border/70 bg-card/65 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/40 hover:bg-card/90 md:p-8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all group-hover:border-emerald-500/20 group-hover:text-emerald-500 md:mb-6 md:h-12 md:w-12">
                  <Layout size={20} />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-foreground md:text-xs">
                  {skill.name}
                </p>
                <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-background opacity-40 transition-opacity group-hover:opacity-100">
                  <div
                    className="bg-emerald-500 h-full w-0 group-hover:w-full transition-all duration-700"
                    style={{ width: `${skill.proficiency ?? 0}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="border-sky-500/25 bg-sky-500/8 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300"
            >
              Certifications
            </Badge>
            <h3 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              Verified Credentials
            </h3>
          </div>
          <Link
            href="/certifications"
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-3xl border border-border/70 bg-card/70 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-sky-600 dark:text-indigo-400">
                  <Award size={20} />
                </div>
                <h4 className="mb-1 line-clamp-2 text-lg font-black text-foreground">
                  {cert.name}
                </h4>
                <p className="mb-4 text-sm font-semibold text-muted-foreground">
                  {cert.issuer}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {cert.issue_date
                      ? new Date(cert.issue_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "No Date"}
                  </span>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-600 transition-colors hover:text-sky-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Verify <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/45 p-10 text-center">
            <p className="text-sm font-semibold text-muted-foreground">
              Sertifikat belum ada.
            </p>
          </div>
        )}
      </section>

      {/* CTA section - High Vibrancy Redesign */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.4rem] bg-linear-to-br from-sky-600 via-indigo-600 to-emerald-600 p-8 text-center shadow-[0_0_70px_rgba(37,99,235,0.3)] sm:p-12 md:rounded-[3.5rem] md:p-24 lg:p-32"
        >
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[60%] w-[60%] rounded-full bg-white/14 blur-[100px]"></div>
          <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-emerald-300/30 blur-[100px]"></div>

          <div className="relative z-10 space-y-8 md:space-y-12">
            <div className="space-y-4">
              <Badge className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white md:px-6 md:py-2">
                Mission Brief
              </Badge>
              <h2 className="text-4xl leading-[0.8] font-black tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
                Ready to <br />
                <span className="opacity-60 italic">Escalate?</span>
              </h2>
            </div>

            <p className="mx-auto max-w-2xl text-base leading-relaxed font-medium text-indigo-100/80 md:text-xl">
              Currently taking on select high-impact projects. If you have a
              bold vision, let&apos;s build the definitive solution.
            </p>

            <div className="flex flex-col items-center justify-center gap-5 pt-2 sm:flex-row sm:gap-8 sm:pt-4">
              <Link href="/contact">
                <Button className="h-14 rounded-2xl bg-white px-9 text-lg font-black text-indigo-700 shadow-2xl transition-all active:scale-95 hover:bg-zinc-100 sm:h-16 sm:rounded-3xl sm:px-14 sm:text-2xl">
                  Launch Project
                </Button>
              </Link>
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="#"
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/20 text-white transition-all hover:bg-black/30 sm:h-16 sm:w-16 sm:rounded-3xl"
                >
                  <Github
                    size={22}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href="#"
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/20 text-white transition-all hover:bg-black/30 sm:h-16 sm:w-16 sm:rounded-3xl"
                >
                  <Globe
                    size={22}
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
