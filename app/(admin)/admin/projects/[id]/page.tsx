import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return <ProjectForm initialData={project} />;
}
