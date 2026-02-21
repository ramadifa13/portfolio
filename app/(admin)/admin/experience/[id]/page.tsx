import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ExperienceForm from "@/components/admin/ExperienceForm";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .single();

  if (!experience) {
    notFound();
  }

  return <ExperienceForm initialData={experience} />;
}
