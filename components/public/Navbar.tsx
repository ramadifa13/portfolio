"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/public/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
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

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-300 sm:px-6 lg:px-8",
        scrolled ? "py-3" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "border border-border/70 bg-background/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Link
          href="/"
          className="bg-linear-to-r from-indigo-500 to-emerald-500 bg-clip-text text-lg font-extrabold text-transparent transition-transform hover:scale-105 sm:text-xl"
        >
          Portfolio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 lg:px-4",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-bg"
                  className="-z-10 absolute inset-0 rounded-full border border-border/80 bg-card/85"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-2 rounded-full border border-border/70 bg-card/70 text-foreground hover:bg-accent/60" />
          <Link
            href="/contact"
            className="ml-3 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] lg:px-6"
          >
            Hire Me <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-full p-2 text-foreground transition-colors hover:bg-accent/60 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
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
            className="absolute left-3 right-3 top-[4.8rem] z-[60] overflow-hidden rounded-3xl border border-border/80 bg-background/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
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
                      "block py-2 text-xl font-extrabold transition-colors",
                      pathname === item.href
                        ? "text-indigo-500 dark:text-indigo-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                <ThemeToggle className="rounded-full border border-border/70 bg-card/70 text-foreground hover:bg-accent/60" />
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
                >
                  Hire Me <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
