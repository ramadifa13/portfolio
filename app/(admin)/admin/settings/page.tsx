import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Bell, Database } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const settingsItems = [
    {
      title: "Security",
      description: "Manage your password and authentication methods.",
      icon: Shield,
    },
    {
      title: "API Keys",
      description: "Configure external integrations and keys.",
      icon: Key,
    },
    {
      title: "Notifications",
      description: "Set up email alerts for CMS activities.",
      icon: Bell,
    },
    {
      title: "Database",
      description: "Direct access to Supabase management console.",
      icon: Database,
      external: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-zinc-400">System and account configuration.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-900 text-zinc-100 col-span-full">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription className="text-zinc-500">
              Currently logged in as admin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-lg font-bold">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-white">{user?.email}</p>
                <Badge className="bg-emerald-600/20 text-emerald-400 border-none">
                  Administrator
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {settingsItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <Icon size={20} />
                </div>
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-zinc-500">
                    {item.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
