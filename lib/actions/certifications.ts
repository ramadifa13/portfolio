"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCertification(data: any) {
  const supabase = await createClient();

  // Sanitize data
  const sanitizedData = {
    ...data,
    issue_date: data.issue_date === "" ? null : data.issue_date,
    credential_url: data.credential_url === "" ? null : data.credential_url,
  };

  const { data: cert, error } = await supabase
    .from("certifications")
    .insert([sanitizedData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/certifications");
  revalidatePath("/certifications");
  return cert;
}

export async function updateCertification(id: string, data: any) {
  const supabase = await createClient();

  // Sanitize data
  const sanitizedData = {
    ...data,
    issue_date: data.issue_date === "" ? null : data.issue_date,
    credential_url: data.credential_url === "" ? null : data.credential_url,
  };

  const { data: cert, error } = await supabase
    .from("certifications")
    .update(sanitizedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/certifications");
  revalidatePath("/certifications");
  return cert;
}

export async function deleteCertification(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("certifications").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/certifications");
  revalidatePath("/certifications");
}
