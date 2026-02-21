"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8",
        scrolled ? "py-4" : "py-6",
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border border-white/10 h-14 shadow-2xl"
            : "bg-transparent h-14",
        )}
      >
        <Link
          href="/"
          className="text-xl font-bold bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Portfolio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                pathname === item.href
                  ? "text-white"
                  : "text-zinc-400 hover:text-white",
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            Hire Me <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-4 right-4 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden z-51"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.href}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-bold transition-colors block py-2",
                      pathname === item.href
                        ? "text-indigo-400"
                        : "text-zinc-400",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
