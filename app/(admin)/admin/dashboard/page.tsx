import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, FolderKanban, Code2, Award, Clock } from "lucide-react";
import { Database } from "@/types/database";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type Experience = Database["public"]["Tables"]["experience"]["Row"];
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts
  const [
    { count: projectsCount },
    { count: experienceCount },
    { count: skillsCount },
    { count: certsCount },
    { data: recentProjects },
    { data: recentExperience },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("experience").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("certifications").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3),
    supabase
      .from("experience")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  const stats = [
    {
      label: "Live Projects",
      value: projectsCount || 0,
      icon: FolderKanban,
      color: "from-indigo-500 to-blue-600",
      lightColor: "text-indigo-400 bg-indigo-500/10",
    },
    {
      label: "Work Experience",
      value: experienceCount || 0,
      icon: Briefcase,
      color: "from-emerald-500 to-teal-600",
      lightColor: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Technical Skills",
      value: skillsCount || 0,
      icon: Code2,
      color: "from-amber-500 to-orange-600",
      lightColor: "text-amber-400 bg-amber-500/10",
    },
    {
      label: "Certifications",
      value: certsCount || 0,
      icon: Award,
      color: "from-purple-500 to-pink-600",
      lightColor: "text-purple-400 bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-3">
          Dashboard{" "}
          <span className="text-indigo-500 text-sm font-bold uppercase tracking-widest ml-4 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            Overview
          </span>
        </h1>
        <p className="text-zinc-500 font-medium max-w-2xl">
          Complete control over your digital portfolio. Monitor your
          professional assets and manage content seamlessly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="group border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-900/80"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`}
              ></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.lightColor}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-widest leading-none">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-black text-white">
                    {stat.value}
                  </h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-zinc-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-white">
                Recent Projects
              </h2>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] border-white/10 uppercase tracking-widest"
            >
              Global Feed
            </Badge>
          </div>
          <CardContent className="p-0">
            {recentProjects && recentProjects.length > 0 ? (
              <div className="divide-y divide-white/5">
                {recentProjects.map((project: Project) => (
                  <div
                    key={project.id}
                    className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center overflow-hidden">
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt=""
                            fill
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <FolderKanban size={18} className="text-zinc-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm tracking-wide">
                          {project.title}
                        </p>
                        <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">
                          {new Date(
                            String(project.created_at),
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge
                        variant="outline"
                        className="text-indigo-400 border-indigo-400/20 bg-indigo-500/5 px-2 py-0"
                      >
                        Edit
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 text-center py-20 font-bold uppercase tracking-[0.2em]">
                No recent projects found
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-zinc-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-white">
                Recent Experience
              </h2>
            </div>
          </div>
          <CardContent className="p-0">
            {recentExperience && recentExperience.length > 0 ? (
              <div className="divide-y divide-white/5">
                {recentExperience.map((exp: Experience) => (
                  <div
                    key={exp.id}
                    className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-white font-bold text-sm tracking-wide">
                        {exp.position}
                      </p>
                      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 text-center py-20 font-bold uppercase tracking-[0.2em]">
                No recent experience entries found
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
