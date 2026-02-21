import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 border-indigo-500/20 bg-indigo-500/5 px-3 py-1"
          >
            Project Vault
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">
            Manage <span className="text-indigo-500">Portfolio.</span>
          </h1>
        </div>
        <Button
          asChild
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {!projects || projects.length === 0 ? (
          <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 mb-4 border border-white/5">
                <FolderKanban size={24} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                No projects found in the vault
              </p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex items-center gap-6 p-4 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/80 transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt=""
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-800">
                    <FolderKanban size={32} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-black text-white tracking-tight truncate">
                    {project.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase font-black tracking-widest text-zinc-500 border-white/10 px-2 py-0"
                  >
                    {project.project_type}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    className={
                      project.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
                        : "bg-zinc-800 text-zinc-500 border-white/5 hover:bg-zinc-800"
                    }
                  >
                    <span className="uppercase text-[9px] font-black tracking-widest">
                      {project.status}
                    </span>
                  </Badge>
                  {project.featured && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Sparkles size={10} />
                      <span className="text-[10px] uppercase font-black tracking-widest">
                        Featured
                      </span>
                    </div>
                  )}
                  <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <Link href={`/projects/${project.slug}`} target="_blank">
                    <ExternalLink size={16} />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <Link href={`/admin/projects/${project.id}`}>
                    <Edit size={16} />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
