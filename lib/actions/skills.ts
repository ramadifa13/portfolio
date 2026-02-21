"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database";

type SkillInsert = Database["public"]["Tables"]["skills"]["Insert"];
type SkillUpdate = Database["public"]["Tables"]["skills"]["Update"];

export async function createSkill(data: SkillInsert) {
  const supabase = await createClient();

  const { data: skill, error } = await supabase
    .from("skills")
    .insert([data])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  return skill;
}

export async function updateSkill(id: string, data: SkillUpdate) {
  const supabase = await createClient();

  const { data: skill, error } = await supabase
    .from("skills")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  return skill;
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/skills");
  revalidatePath("/skills");
}
