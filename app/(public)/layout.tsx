import { Navbar } from "@/components/public/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-900/50 to-zinc-950 opacity-100"></div>

        {/* Primary Color Blobs - Increased Opacity and Scale */}
        <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/20 rounded-full blur-[160px] animate-blob"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-emerald-600/15 rounded-full blur-[160px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25%] left-[15%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[140px] animate-blob animation-delay-4000"></div>

        {/* Additional Vibrant Auras */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/3 rounded-full blur-[180px] pointer-events-none"></div>

        {/* Subtle Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Enhanced Grid Pattern Visibility */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0.2))] opacity-[0.15]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-16">{children}</main>

        <footer className="border-t border-white/5 py-20 bg-black/40 backdrop-blur-sm mt-20 relative overflow-hidden">
          {/* Footer Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/5 blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-black bg-linear-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent mb-6 tracking-tighter">
                  Portfolio.
                </h2>
                <p className="text-zinc-400 max-w-sm leading-relaxed font-medium">
                  Crafting exceptional digital experiences through senior-level
                  engineering and thoughtful design. Available for high-impact
                  collaborations.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
                  Navigation
                </h3>
                <ul className="space-y-4 text-zinc-400 text-sm font-bold">
                  <li>
                    <a
                      href="/projects"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="/experience"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Experience
                    </a>
                  </li>
                  <li>
                    <a
                      href="/skills"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Skills
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
                  Connect
                </h3>
                <ul className="space-y-4 text-zinc-400 text-sm font-bold">
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      Email
                    </a>
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
