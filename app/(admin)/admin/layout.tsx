import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
      {/* Subtle Admin Background Particles/Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-72 w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]"></div>

        {/* Noise overlay refined for admin */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <Sidebar />

      <main className="flex-1 relative z-10 overflow-x-hidden pt-4">
        <div className="p-8 max-w-7xl mx-auto space-y-10 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
