"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Sparkles,
  Briefcase,
  MapPin,
  Calendar,
  Info,
} from "lucide-react";
import { createExperience, updateExperience } from "@/lib/actions/experience";
import { Database } from "@/types/database";

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional(),
  description: z.string().optional(),
  is_current: z.boolean(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  initialData?: Database["public"]["Tables"]["experience"]["Row"];
}

export default function ExperienceForm({ initialData }: ExperienceFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          location: initialData.location || "",
          end_date: initialData.end_date || "",
          description: initialData.description || "",
          is_current:
            typeof initialData.is_current === "boolean"
              ? initialData.is_current
              : false,
        }
      : {
          company: "",
          position: "",
          location: "",
          start_date: "",
          end_date: "",
          description: "",
          is_current: false,
        },
  });

  async function onSubmit(values: ExperienceFormValues) {
    setLoading(true);
    try {
      if (initialData) {
        await updateExperience(initialData.id, values);
      } else {
        await createExperience(values);
      }
      router.push("/admin/experience");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 max-w-4xl"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 border-emerald-500/20 bg-emerald-500/5 px-3 py-1"
            >
              Career Timeline
            </Badge>
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              {initialData ? "Edit" : "New"}{" "}
              <span className="text-emerald-500">Experience.</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 px-6 font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 font-black shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Save Entry
            </Button>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Info size={16} className="text-zinc-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                Professional Details
              </h2>
            </div>

            <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase size={12} className="text-zinc-500" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Company Name
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Tech Solutions Inc."
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-emerald-500/50 h-12 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles size={12} className="text-emerald-400" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Job Title
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Senior Technical Architect"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-emerald-500/50 h-12 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={12} className="text-zinc-500" />
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                          Office Location
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Remote / New York, NY"
                          {...field}
                          className="bg-zinc-950/50 border-white/5 focus:border-emerald-500/50 h-12 font-medium"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-bold" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={12} className="text-zinc-500" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Starting Date
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-emerald-500/50 h-12 font-medium block"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                  {!form.watch("is_current") && (
                    <FormField
                      control={form.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={12} className="text-zinc-500" />
                            <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                              Ending Date
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="bg-zinc-950/50 border-white/5 focus:border-emerald-500/50 h-12 font-medium block"
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-bold" />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="is_current"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-3xl border border-white/5 bg-black/20 p-6 group hover:border-emerald-500/20 transition-colors">
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-black text-white uppercase tracking-widest">
                          Active Status
                        </FormLabel>
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                          I currently work here
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          className="data-[state=checked]:bg-emerald-500"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest block mb-2">
                        Achievements & Responsibilities
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your core impact and key projects..."
                          {...field}
                          className="bg-zinc-950/50 border-white/5 focus:border-emerald-500/50 min-h-[180px] font-medium leading-relaxed"
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
      </form>
    </Form>
  );
}
