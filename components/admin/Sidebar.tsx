"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Code2,
  User,
  Settings,
  ExternalLink,
  LogOut,
  FolderKanban,
  Award,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-72 border-r border-white/5 bg-zinc-950 flex flex-col h-screen sticky top-0 z-20 overflow-hidden">
      {/* Mesh Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10 p-8">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white tracking-tight">
              Admin <span className="text-indigo-400">Panel</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mt-1">
              Portfolio CMS v2.0
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto relative z-10 scrollbar-hide">
        <div className="space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 opacity-70">
            Main Navigation
          </p>
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-zinc-500 hover:text-white hover:bg-white/5",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl -z-10"
                  />
                )}
                <div
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    isActive
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-300",
                  )}
                >
                  <Icon size={18} />
                </div>
                <span className="font-bold text-sm tracking-wide flex-1">
                  {item.label}
                </span>
                {isActive && (
                  <ChevronRight size={14} className="text-zinc-600" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 opacity-70">
            Configuration
          </p>
          {navItems.slice(5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-white/5 text-white"
                    : "text-zinc-500 hover:text-white hover:bg-white/5",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl -z-10"
                  />
                )}
                <div
                  className={cn(
                    "p-2 rounded-xl transition-colors",
                    isActive
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-300",
                  )}
                >
                  <Icon size={18} />
                </div>
                <span className="font-bold text-sm tracking-wide flex-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-6 mt-auto relative z-10 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all text-xs font-bold"
          >
            <div className="p-1.5 rounded-lg bg-zinc-800">
              <ExternalLink size={14} />
            </div>
            <span>View Live Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs font-bold"
          >
            <div className="p-1.5 rounded-lg bg-zinc-800 group-hover:bg-red-500/10">
              <LogOut size={14} />
            </div>
            <span>Sign Out Account</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
