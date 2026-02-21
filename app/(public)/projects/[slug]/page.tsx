import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Calendar,
  User,
  Layout,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Link
        href="/projects"
        className="text-zinc-400 hover:text-white flex items-center gap-2 mb-12 text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Left Column: Content */}
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="aspect-video relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600">
                No Image
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
            <div className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {project.long_description || "No detailed description available."}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-8">
          <CardWrapper title="Project Details">
            <div className="space-y-6">
              <MetaItem
                icon={Layout}
                label="Type"
                value={project.project_type || "Web"}
              />
              <MetaItem
                icon={User}
                label="Role"
                value={project.role || "Solo"}
              />
              <MetaItem
                icon={Calendar}
                label="Date"
                value={
                  project.created_at
                    ? new Date(project.created_at).getFullYear().toString()
                    : "N/A"
                }
              />
            </div>
          </CardWrapper>

          <CardWrapper title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.map((tech: string) => (
                <Badge
                  key={tech}
                  className="bg-zinc-800 text-zinc-300 border-none px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardWrapper>

          <div className="flex flex-col gap-4">
            {project.live_url && (
              <Button
                className="w-full bg-white text-black hover:bg-zinc-200"
                asChild
              >
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {project.repo_url && (
              <Button
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5"
                asChild
              >
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code <Github className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 text-zinc-300">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="font-medium capitalize">{value}</p>
      </div>
    </div>
  );
}
