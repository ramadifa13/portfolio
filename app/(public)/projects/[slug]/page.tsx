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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <Link
        href="/projects"
        className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:mb-12"
      >
        <ArrowLeft size={16} /> Back to projects
      </Link>

      <div className="grid gap-9 md:gap-12 lg:grid-cols-3">
        {/* Left Column: Content */}
        <div className="space-y-9 lg:col-span-2 lg:space-y-12">
          <div>
            <h1 className="mb-5 text-3xl font-extrabold text-foreground sm:text-4xl md:mb-8 md:text-6xl">
              {project.title}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
              {project.description}
            </p>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-3xl border border-border/70 bg-card/70">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          <div className="max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-foreground">About the Project</h2>
            <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
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
                  className="border-border bg-background/70 px-3 py-1 text-muted-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardWrapper>

          <div className="flex flex-col gap-4">
            {project.live_url && (
              <Button
                className="w-full bg-foreground text-background hover:opacity-90"
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
                className="w-full border-border hover:bg-accent/65"
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
    <div className="rounded-2xl border border-border/70 bg-card/70 p-6">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
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
    <div className="flex items-center gap-4 text-foreground">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-muted-foreground">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium capitalize">{value}</p>
      </div>
    </div>
  );
}
