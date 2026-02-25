"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database";

type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export async function updateProfile(id: string, data: ProfileUpdate) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .upsert({ id, ...data, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/profile");
  revalidatePath("/about");
}
