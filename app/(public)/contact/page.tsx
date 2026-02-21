"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ArrowUpRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data } = await supabase.from("profiles").select("*").single();
      if (data) setProfile(data);
    }
    fetchProfile();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${profile?.email || "hello@example.com"}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
          Get in <span className="text-indigo-400">Touch.</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
          Whether you have a specific project in mind or just want to explore
          possibilities, I&apos;m always open to new connections and
          collaborations.
        </p>
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-400 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
              Contact Info
            </h2>
            <div className="grid gap-8">
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

              <div className="pt-8 border-t border-white/5 space-y-6">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Social Networks
                </p>
                <div className="flex flex-wrap gap-4">
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
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
              <Send size={200} />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white">
                  Send a Message
                </h3>
                <p className="text-zinc-500 font-medium">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4">
                      Full Name
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="h-16 rounded-2xl bg-black/50 border-white/5 text-white focus:border-indigo-500/50 transition-all pl-6"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4">
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
                      className="h-16 rounded-2xl bg-black/50 border-white/5 text-white focus:border-indigo-500/50 transition-all pl-6"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4">
                    Subject
                  </label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Briefly describe your inquiry..."
                    className="h-16 rounded-2xl bg-black/50 border-white/5 text-white focus:border-indigo-500/50 transition-all pl-6"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-4">
                    Your Message
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me more about your project..."
                    className="rounded-2xl bg-black/50 border-white/5 text-white focus:border-indigo-500/50 transition-all min-h-[180px] p-6 text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3"
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
  icon: any;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="flex items-center gap-8 group">
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400 group-hover:bg-indigo-500/5 transition-all duration-500 shadow-xl">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black mb-1">
          {label}
        </p>
        <p className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}

function SocialButton({ icon: Icon, href }: { icon: any; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:border-white hover:text-white hover:bg-zinc-800 transition-all shadow-lg"
    >
      <Icon size={20} />
    </a>
  );
}
