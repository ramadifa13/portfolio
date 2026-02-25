"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database";

type CertificationInsert = Database["public"]["Tables"]["certifications"]["Insert"];
type CertificationUpdate = Database["public"]["Tables"]["certifications"]["Update"];

function sanitizeCertificationData<T extends { issue_date?: string | null; credential_url?: string | null }>(
  data: T,
): T {
  return {
    ...data,
    issue_date: data.issue_date === "" ? null : data.issue_date,
    credential_url: data.credential_url === "" ? null : data.credential_url,
  };
}

export async function createCertification(data: CertificationInsert) {
  const supabase = await createClient();

  const sanitizedData = sanitizeCertificationData(data);

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

export async function updateCertification(id: string, data: CertificationUpdate) {
  const supabase = await createClient();

  const sanitizedData = sanitizeCertificationData(data);

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
