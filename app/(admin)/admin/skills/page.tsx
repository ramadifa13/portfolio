import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Database } from "@/types/database";

type Skill = Database["public"]["Tables"]["skills"]["Row"];

export default async function SkillsPage() {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true });

  // Group skills by category
  const groupedSkills = skills?.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 border-amber-500/20 bg-amber-500/5 px-3 py-1"
          >
            Technical Mastery
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">
            Skill <span className="text-amber-500">Inventory.</span>
          </h1>
        </div>
        <Button
          asChild
          className="bg-amber-600 hover:bg-amber-700 text-white font-black px-8 shadow-lg shadow-amber-600/20 transition-all active:scale-95"
        >
          <Link href="/admin/skills/new">
            <Plus className="mr-2 h-4 w-4" /> Add Technical Skill
          </Link>
        </Button>
      </div>

      {!skills || skills.length === 0 ? (
        <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 mb-4 border border-white/5">
              <Code2 size={24} />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              No skills identified yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {Object.entries(groupedSkills ?? {}).map(
            ([category, categorySkills]) => (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/5"></div>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 px-4">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-white/5"></div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative p-4 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/80 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-amber-500/50 group-hover:text-amber-400 transition-colors">
                            <Code2 size={18} />
                          </div>
                          <div>
                            <h3 className="text-sm font-black text-white tracking-tight leading-none mb-1">
                              {skill.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-[8px] border-white/5 bg-zinc-950 px-1.5 py-0 font-black text-zinc-500"
                              >
                                {skill.proficiency}%
                              </Badge>
                              {skill.featured && (
                                <Sparkles size={8} className="text-amber-500" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="w-8 h-8 rounded-lg bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-white"
                          >
                            <Link href={`/admin/skills/${skill.id}`}>
                              <Edit size={14} />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 rounded-lg bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-red-400"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-white/5">
                        <div
                          className="bg-linear-to-r from-amber-600 to-amber-400 h-full rounded-full group-hover:shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
