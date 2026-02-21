import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { CertificationForm } from "@/components/admin/CertificationForm";

export default async function EditCertificationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: cert } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!cert) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Edit Certification
        </h1>
        <p className="text-zinc-400">Update your certification details.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
        <CertificationForm initialData={cert} />
      </div>
    </div>
  );
}
