"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Info,
  Globe,
} from "lucide-react";
import { updateProfile } from "@/lib/actions/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Database } from "@/types/database";

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Professional title is required"),
  bio: z.string().optional(),
  github_url: z.string().url().or(z.literal("")).optional(),
  linkedin_url: z.string().url().or(z.literal("")).optional(),
  twitter_url: z.string().url().or(z.literal("")).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  userId: string;
  initialData: Database["public"]["Tables"]["profiles"]["Row"] | null;
}

export default function ProfileForm({ userId, initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: initialData?.full_name || "",
      title: initialData?.title || "",
      bio: initialData?.bio || "",
      github_url: initialData?.github_url || "",
      linkedin_url: initialData?.linkedin_url || "",
      twitter_url: initialData?.twitter_url || "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    setLoading(true);
    try {
      await updateProfile(userId, values);
      toast.success("Profile synchronized successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 max-w-5xl"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 border-indigo-500/20 bg-indigo-500/5 px-3 py-1"
            >
              Identity Control
            </Badge>
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              Personna <span className="text-indigo-500">Settings.</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 font-black shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Synchronize Profile
            </Button>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Core Identity */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Info size={16} className="text-zinc-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                  Public Personna
                </h2>
              </div>

              <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                            Display Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-12 font-medium"
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                            Professional Rank
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Senior Full Stack Engineer"
                              {...field}
                              className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-12 font-medium"
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-bold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Manifesto / Bio
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell your professional story..."
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 min-h-[200px] font-medium leading-relaxed"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Connectivity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-zinc-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                Connectivity
              </h2>
            </div>

            <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <Github size={12} className="text-zinc-500" />
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                          GitHub Repository
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/..."
                          {...field}
                          className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-bold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <Linkedin size={12} className="text-indigo-400" />
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                          LinkedIn Network
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/..."
                          {...field}
                          className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-bold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter_url"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <Twitter size={12} className="text-sky-400" />
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                          X / Twitter
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="https://x.com/..."
                          {...field}
                          className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-bold" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-sm">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                Note: These links will be displayed in the footer and about
                section of your public portfolio.
              </p>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
