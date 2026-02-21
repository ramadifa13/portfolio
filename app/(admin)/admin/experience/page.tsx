import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, Briefcase, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function ExperiencePage() {
  const supabase = await createClient();

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 border-emerald-500/20 bg-emerald-500/5 px-3 py-1"
          >
            Professional Journey
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">
            Work <span className="text-emerald-500">History.</span>
          </h1>
        </div>
        <Button
          asChild
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
        >
          <Link href="/admin/experience/new">
            <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {!experience || experience.length === 0 ? (
          <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 mb-4 border border-white/5">
                <Briefcase size={24} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                No career history found
              </p>
            </CardContent>
          </Card>
        ) : (
          experience.map((exp) => (
            <div
              key={exp.id}
              className="group relative flex items-center gap-6 p-6 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/80 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                <Briefcase size={28} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-black text-white tracking-tight truncate">
                    {exp.position}
                  </h3>
                  {exp.is_current && (
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10 uppercase text-[9px] font-black tracking-widest px-2 py-0">
                      Current
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="text-xs font-bold text-zinc-300">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Calendar size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {format(new Date(exp.start_date), "MMM yyyy")} -{" "}
                      {exp.is_current
                        ? "Present"
                        : exp.end_date
                          ? format(new Date(exp.end_date), "MMM yyyy")
                          : "N/A"}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <MapPin size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[150px]">
                        {exp.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <Link href={`/admin/experience/${exp.id}`}>
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
