import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import SkillForm from "@/components/admin/SkillForm";

interface EditSkillPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (!skill) {
    notFound();
  }

  return <SkillForm initialData={skill} />;
}
