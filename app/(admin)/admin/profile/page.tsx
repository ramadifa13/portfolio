import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/admin/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className="space-y-8">
      <ProfileForm userId={user.id} initialData={profile} />
    </div>
  );
}
