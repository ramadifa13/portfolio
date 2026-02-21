import { CertificationForm } from "@/components/admin/CertificationForm";

export default function NewCertificationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Add Certification
        </h1>
        <p className="text-zinc-400">Add a new professional achievement.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
        <CertificationForm />
      </div>
    </div>
  );
}
