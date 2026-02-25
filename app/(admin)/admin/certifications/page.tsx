import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Award,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function CertificationsPage() {
  const supabase = await createClient();

  const { data: certs } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 border-purple-500/20 bg-purple-500/5 px-3 py-1"
          >
            Verified Credentials
          </Badge>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">
            Certification <span className="text-purple-500">Hall.</span>
          </h1>
        </div>
        <Button
          asChild
          className="bg-purple-600 hover:bg-purple-700 text-white font-black px-8 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
        >
          <Link href="/admin/certifications/new">
            <Plus className="mr-2 h-4 w-4" /> Add Certification
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {!certs || certs.length === 0 ? (
          <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500 mb-4 border border-white/5">
                <Award size={24} />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
                No certifications registered
              </p>
            </CardContent>
          </Card>
        ) : (
          certs.map((cert) => (
            <div
              key={cert.id}
              className="group relative flex items-center gap-6 p-6 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/80 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-purple-500/50 group-hover:text-purple-400 transition-colors">
                <Award size={28} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-black text-white tracking-tight truncate">
                    {cert.name}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="text-xs font-bold text-zinc-300">
                      {cert.issuer}
                    </span>
                  </div>
                  {cert.issue_date && (
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Calendar size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(cert.issue_date).toLocaleDateString(
                          undefined,
                          { month: "short", year: "numeric" },
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                {cert.credential_url && (
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="w-10 h-10 rounded-xl bg-zinc-950/50 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <Link href={`/admin/certifications/${cert.id}`}>
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
