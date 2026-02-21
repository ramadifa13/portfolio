"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database";

type ExperienceInsert = Database["public"]["Tables"]["experience"]["Insert"];
type ExperienceUpdate = Database["public"]["Tables"]["experience"]["Update"];

export async function createExperience(data: ExperienceInsert) {
  const supabase = await createClient();

  // Sanitize data: convert empty strings to null for date fields
  const sanitizedData = {
    ...data,
    end_date: data.end_date === "" ? null : data.end_date,
    start_date: data.start_date === "" ? null : data.start_date,
    location: data.location === "" ? null : data.location,
    description: data.description === "" ? null : data.description,
  };

  const { data: entry, error } = await supabase
    .from("experience")
    .insert([sanitizedData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  return entry;
}

export async function updateExperience(id: string, data: ExperienceUpdate) {
  const supabase = await createClient();

  // Sanitize data
  const sanitizedData = {
    ...data,
    end_date: data.end_date === "" ? null : data.end_date,
    start_date: data.start_date === "" ? null : data.start_date,
    location: data.location === "" ? null : data.location,
    description: data.description === "" ? null : data.description,
  };

  const { data: entry, error } = await supabase
    .from("experience")
    .update(sanitizedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  return entry;
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("experience").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
}
