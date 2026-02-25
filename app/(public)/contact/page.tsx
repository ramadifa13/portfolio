"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  LucideIcon,
  MapPin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Database } from "@/types/database";

type ContactProfile = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "email" | "location" | "github_url" | "linkedin_url" | "twitter_url"
>;

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [profile, setProfile] = useState<ContactProfile | null>(null);
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("email,location,github_url,linkedin_url,twitter_url")
        .single();

      if (data) setProfile(data);
    }
    fetchProfile();
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${profile?.email || "hello@example.com"}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 max-w-3xl md:mb-20"
      >
        <h1 className="mb-6 text-4xl leading-tight font-black text-foreground sm:text-5xl md:mb-8 md:text-7xl">
          Get in <span className="text-sky-600 dark:text-indigo-400">Touch.</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
          Whether you have a specific project in mind or just want to explore
          possibilities, I&apos;m always open to new connections and
          collaborations.
        </p>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-8 lg:col-span-5 lg:space-y-12">
          <div className="space-y-6">
            <h2 className="w-fit rounded-full border border-sky-500/20 bg-sky-500/8 px-4 py-1 text-xs font-black uppercase tracking-[0.3em] text-sky-600 dark:text-indigo-300">
              Contact Info
            </h2>
            <div className="grid gap-6 md:gap-8">
              <ContactLink
                icon={Mail}
                label="Email"
                value={profile?.email || "hello@example.com"}
                href={`mailto:${profile?.email || "hello@example.com"}`}
              />
              <ContactLink
                icon={MapPin}
                label="Location"
                value={profile?.location || "Remote / Global"}
                href="#"
              />

              <div className="space-y-6 border-t border-border/70 pt-6 md:pt-8">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Social Networks
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {profile?.github_url && (
                    <SocialButton icon={Github} href={profile.github_url} />
                  )}
                  {profile?.linkedin_url && (
                    <SocialButton icon={Linkedin} href={profile.linkedin_url} />
                  )}
                  {profile?.twitter_url && (
                    <SocialButton icon={Twitter} href={profile.twitter_url} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/72 p-6 shadow-xl backdrop-blur-sm md:rounded-[3rem] md:p-10 lg:p-14">
            <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-[0.03] md:p-12">
              <Send size={180} />
            </div>

            <div className="relative z-10 space-y-7 md:space-y-10">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground md:text-3xl">
                  Send a Message
                </h3>
                <p className="font-medium text-muted-foreground">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-5 md:space-y-6">
                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2.5 md:space-y-3">
                    <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-muted-foreground md:ml-4">
                      Full Name
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="h-12 rounded-2xl border-border bg-background/70 pl-4 text-foreground transition-all focus:border-sky-500/50 md:h-16 md:pl-6"
                    />
                  </div>
                  <div className="space-y-2.5 md:space-y-3">
                    <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-muted-foreground md:ml-4">
                      Email Address
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="h-12 rounded-2xl border-border bg-background/70 pl-4 text-foreground transition-all focus:border-sky-500/50 md:h-16 md:pl-6"
                    />
                  </div>
                </div>
                <div className="space-y-2.5 md:space-y-3">
                  <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-muted-foreground md:ml-4">
                    Subject
                  </label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Briefly describe your inquiry..."
                    className="h-12 rounded-2xl border-border bg-background/70 pl-4 text-foreground transition-all focus:border-sky-500/50 md:h-16 md:pl-6"
                  />
                </div>
                <div className="space-y-2.5 md:space-y-3">
                  <label className="ml-1 text-[11px] font-black uppercase tracking-widest text-muted-foreground md:ml-4">
                    Your Message
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me more about your project..."
                    className="min-h-[150px] rounded-2xl border-border bg-background/70 p-4 text-base text-foreground transition-all focus:border-sky-500/50 md:min-h-[180px] md:p-6 md:text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 text-base font-black text-white shadow-[0_0_26px_rgba(79,70,229,0.26)] transition-all hover:bg-indigo-500 md:h-16 md:text-lg"
                >
                  Send message <Send size={20} />
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-4 md:gap-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-lg transition-all duration-500 group-hover:border-sky-500/50 group-hover:bg-sky-500/5 group-hover:text-sky-600 md:h-16 md:w-16 dark:group-hover:text-indigo-400">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-lg font-black text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-indigo-400 md:text-2xl">
          {value}
        </p>
      </div>
    </a>
  );
}

function SocialButton({ icon: Icon, href }: { icon: LucideIcon; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-lg transition-all hover:border-sky-500/40 hover:bg-accent/70 hover:text-foreground md:h-14 md:w-14"
    >
      <Icon size={19} />
    </a>
  );
}
