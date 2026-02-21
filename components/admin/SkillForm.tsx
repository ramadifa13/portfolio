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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Sparkles,
  Code2,
  Layers,
  TrendingUp,
  Info,
} from "lucide-react";
import { createSkill, updateSkill } from "@/lib/actions/skills";
import { Database } from "@/types/database";
import { Slider } from "@/components/ui/slider";

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.number().min(0).max(100),
  icon: z.string().optional(),
  featured: z.boolean().default(false),
});

type SkillFormValues = z.infer<typeof skillSchema>;

interface SkillFormProps {
  initialData?: Database["public"]["Tables"]["skills"]["Row"];
}

export default function SkillForm({ initialData }: SkillFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          icon: initialData.icon || "",
          proficiency: initialData.proficiency || 0,
        }
      : {
          name: "",
          category: "Frontend",
          proficiency: 80,
          icon: "",
          featured: false,
        },
  });

  async function onSubmit(values: SkillFormValues) {
    setLoading(true);
    try {
      if (initialData) {
        await updateSkill(initialData.id, values);
      } else {
        await createSkill(values);
      }
      router.push("/admin/skills");
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
              className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 border-amber-500/20 bg-amber-500/5 px-3 py-1"
            >
              Technical Arsenal
            </Badge>
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              {initialData ? "Edit" : "New"}{" "}
              <span className="text-amber-500">Skill.</span>
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
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 font-black shadow-lg shadow-amber-600/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Save Skill
            </Button>
          </div>
        </div>

        <div className="grid gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Info size={16} className="text-zinc-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                Skill Intelligence
              </h2>
            </div>

            <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 space-y-10">
                <div className="grid gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Skill Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. distributed systems"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-amber-500/50 h-12 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Domain
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-950/50 border-white/5 focus:border-amber-500/50 h-12 font-bold uppercase text-[10px] tracking-widest">
                              <SelectValue placeholder="Select Domain" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10 text-zinc-100 uppercase font-black tracking-widest text-[10px]">
                            <SelectItem value="Frontend">
                              Frontend Development
                            </SelectItem>
                            <SelectItem value="Backend">
                              Backend Systems
                            </SelectItem>
                            <SelectItem value="DevOps">
                              Cloud & DevOps
                            </SelectItem>
                            <SelectItem value="Design">
                              Product Design
                            </SelectItem>
                            <SelectItem value="Other">Miscellaneous</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="proficiency"
                  render={({ field }) => (
                    <FormItem className="space-y-6">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Proficiency Mastery
                        </FormLabel>
                        <Badge
                          variant="outline"
                          className="text-amber-400 border-amber-400/20 bg-amber-500/5 font-black"
                        >
                          {field.value}%
                        </Badge>
                      </div>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-right italic">
                        Slide to adjust confidence level
                      </p>
                      <FormMessage className="text-xs font-bold" />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-3xl border border-white/5 bg-black/20 p-6 group hover:border-amber-500/20 transition-colors">
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-black text-white uppercase tracking-widest">
                            Showcase
                          </FormLabel>
                          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                            Highlight in gallery
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            className="data-[state=checked]:bg-amber-500"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Lucide Icon Key
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Code2, Layout, Database"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-amber-500/50 h-12 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
