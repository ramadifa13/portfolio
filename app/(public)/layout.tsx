import { Navbar } from "@/components/public/Navbar";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/25">
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background to-background opacity-100"></div>

        {/* Blur effects are reduced on small screens for better paint performance. */}
        <div className="motion-safe:animate-blob absolute left-[-12%] top-[-18%] hidden h-[65%] w-[65%] rounded-full bg-sky-500/14 blur-[140px] sm:block dark:bg-sky-500/18"></div>
        <div className="animation-delay-2000 motion-safe:animate-blob absolute bottom-[-18%] right-[-12%] hidden h-[65%] w-[65%] rounded-full bg-emerald-500/14 blur-[140px] sm:block dark:bg-emerald-500/18"></div>
        <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/6 blur-[140px] dark:bg-indigo-500/8"></div>

        {/* Subtle Noise Texture Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div
          className="absolute inset-0 opacity-[0.14] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage: "linear-gradient(180deg, white, rgba(255,255,255,0.22))",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-20 md:pt-24">{children}</main>

        <footer className="relative mt-16 overflow-hidden border-t border-border/60 bg-background/60 py-14 backdrop-blur-sm md:mt-20 md:py-20">
          {/* Footer Glow */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[250px] w-full -translate-x-1/2 bg-sky-500/7 blur-[120px] dark:bg-indigo-500/10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="mb-4 bg-linear-to-r from-sky-500 to-emerald-500 bg-clip-text text-2xl font-black tracking-tighter text-transparent">
                  Portfolio.
                </h2>
                <p className="max-w-sm text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
                  Crafting exceptional digital experiences through senior-level
                  engineering and thoughtful design. Available for high-impact
                  collaborations.
                </p>
              </div>
              <div>
                <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-foreground">
                  Navigation
                </h3>
                <ul className="space-y-3 text-sm font-semibold text-muted-foreground">
                  <li>
                    <Link
                      href="/projects"
                      className="transition-colors hover:text-sky-500"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/experience"
                      className="transition-colors hover:text-sky-500"
                    >
                      Experience
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/skills"
                      className="transition-colors hover:text-sky-500"
                    >
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/certifications"
                      className="transition-colors hover:text-sky-500"
                    >
                      Certifications
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="transition-colors hover:text-sky-500"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-foreground">
                  Connect
                </h3>
                <ul className="space-y-3 text-sm font-semibold text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="transition-colors hover:text-sky-500"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors hover:text-sky-500"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="transition-colors hover:text-sky-500"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="transition-colors hover:text-sky-500"
                    >
                      Email
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
