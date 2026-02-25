"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  X,
  Upload,
  Loader2,
  Sparkles,
  Globe,
  Github,
  Info,
  Layers,
  Settings2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import {
  createProject,
  updateProject,
  uploadProjectImage,
} from "@/lib/actions/projects";
import { Database } from "@/types/database";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  long_description: z.string().optional(),
  tech_stack: z.array(z.string()).default([]),
  image_url: z.string().optional(),
  role: z.enum(["solo", "team"]).default("solo"),
  project_type: z.enum(["web", "mobile", "internal"]).default("web"),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  live_url: z.string().url().or(z.literal("")).optional(),
  repo_url: z.string().url().or(z.literal("")).optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Database["public"]["Tables"]["projects"]["Row"];
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema) as Resolver<ProjectFormValues>,
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          description: initialData.description || "",
          long_description: initialData.long_description || "",
          tech_stack: initialData.tech_stack || [],
          image_url: initialData.image_url || "",
          role: initialData.role || "solo",
          project_type: initialData.project_type || "web",
          status: initialData.status || "draft",
          featured: initialData.featured || false,
          live_url: initialData.live_url || "",
          repo_url: initialData.repo_url || "",
        }
      : {
          title: "",
          slug: "",
          description: "",
          long_description: "",
          tech_stack: [],
          image_url: "",
          role: "solo",
          project_type: "web",
          status: "draft",
          featured: false,
          live_url: "",
          repo_url: "",
        },
  });

  async function onSubmit(values: ProjectFormValues) {
    setLoading(true);
    try {
      if (initialData) {
        await updateProject(initialData.id, values);
      } else {
        await createProject(values);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const addTech = () => {
    if (techInput.trim()) {
      const current = form.getValues("tech_stack");
      if (!current.includes(techInput.trim())) {
        form.setValue("tech_stack", [...current, techInput.trim()]);
      }
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    const current = form.getValues("tech_stack");
    form.setValue(
      "tech_stack",
      current.filter((t) => t !== tech),
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadProjectImage(file);
      form.setValue("image_url", url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 border-indigo-500/20 bg-indigo-500/5 px-3 py-1"
            >
              Content Management
            </Badge>
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              {initialData ? "Edit" : "Create"}{" "}
              <span className="text-indigo-500">Project.</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 px-6 font-bold"
            >
              Discard Changes
            </Button>
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
              {initialData ? "Sync Changes" : "Launch Project"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Identity & Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Info size={16} className="text-zinc-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                  Identity & Content
                </h2>
              </div>

              <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                            Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Epic Dashboard Tool"
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
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                            Slug (URL)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="epic-dashboard"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Elevator Pitch (Short)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A brief, high-impact summary of this work..."
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 min-h-[100px] font-medium leading-relaxed"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="long_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Technical Deep-Dive (Long)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain the 'Why' and the 'How'. Discuss architecture, challenges, and results..."
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 min-h-[250px] font-medium leading-relaxed"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Architecture & Links */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Layers size={16} className="text-zinc-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                  Architecture & Links
                </h2>
              </div>

              <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest block">
                      Stack Architecture
                    </FormLabel>
                    <div className="flex gap-3">
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTech())
                        }
                        placeholder="Add tech (e.g. Redis, gRPC)"
                        className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-11"
                      />
                      <Button
                        type="button"
                        onClick={addTech}
                        variant="secondary"
                        className="bg-zinc-800 hover:bg-zinc-700 font-bold h-11 px-6"
                      >
                        Register
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {form.watch("tech_stack").map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-zinc-950 text-indigo-400 border-white/5 px-4 py-1.5 flex items-center gap-3 font-bold group"
                        >
                          {tech}
                          <X
                            size={14}
                            className="cursor-pointer text-zinc-600 hover:text-red-400 transition-colors"
                            onClick={() => removeTech(tech)}
                          />
                        </Badge>
                      ))}
                      {form.watch("tech_stack").length === 0 && (
                        <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600 p-2 italic">
                          No technologies registered yet
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 pt-4">
                    <FormField
                      control={form.control}
                      name="live_url"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mb-2">
                            <Globe size={12} className="text-emerald-400" />
                            <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                              Live Access
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="https://app.demo.com"
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
                      name="repo_url"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2 mb-2">
                            <Github size={12} className="text-indigo-400" />
                            <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                              Source Code
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/your/repo"
                              {...field}
                              className="bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 h-12"
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

          <div className="space-y-10">
            {/* Visual assets */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ImageIcon size={16} className="text-zinc-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                  Visual Assets
                </h2>
              </div>

              <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  {form.watch("image_url") ? (
                    <div className="relative group aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-950 shadow-2xl">
                      <Image
                        src={form.watch("image_url") || ""}
                        alt="Preview"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="h-10 px-6 font-black uppercase tracking-widest"
                          onClick={() => form.setValue("image_url", "")}
                        >
                          Remove Asset
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 cursor-pointer transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-4 border border-white/5">
                        <Upload size={20} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">
                        Upload Key Visual
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-6 text-center leading-relaxed">
                    Recommended: 16:9 ratio, High Resolution (PNG/JPG)
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Visibility Settings */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Settings2 size={16} className="text-zinc-500" />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                  Visibility & Metadata
                </h2>
              </div>

              <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 space-y-8">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                          Publication Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 font-bold uppercase text-[10px] tracking-widest">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10 text-zinc-100">
                            <SelectItem
                              value="draft"
                              className="uppercase font-black tracking-widest text-[10px] py-3 text-amber-500/80"
                            >
                              Draft (Private)
                            </SelectItem>
                            <SelectItem
                              value="published"
                              className="uppercase font-black tracking-widest text-[10px] py-3 text-emerald-500/80"
                            >
                              Published (Public)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="project_type"
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
                              <SelectTrigger className="h-11 bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 font-bold text-[10px] uppercase tracking-widest">
                                <SelectValue placeholder="Domain" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-900 border-white/10 text-zinc-100 uppercase font-black tracking-widest text-[10px]">
                              <SelectItem value="web">Web App</SelectItem>
                              <SelectItem value="mobile">
                                Native Mobile
                              </SelectItem>
                              <SelectItem value="internal">
                                Proprietary
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest">
                            Ownership
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11 bg-zinc-950/50 border-white/5 focus:border-indigo-500/50 font-bold text-[10px] uppercase tracking-widest">
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-zinc-900 border-white/10 text-zinc-100 uppercase font-black tracking-widest text-[10px]">
                              <SelectItem value="solo">
                                Sole Engineer
                              </SelectItem>
                              <SelectItem value="team">Lead / Team</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-4xl border border-white/5 bg-black/20 p-6 group hover:border-indigo-500/20 transition-colors">
                        <div className="space-y-1">
                          <FormLabel className="text-sm font-black text-white uppercase tracking-widest">
                            Showcase
                          </FormLabel>
                          <FormDescription className="text-[10px] uppercase font-bold text-zinc-600">
                            Feature on Home Page
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            className="data-[state=checked]:bg-indigo-500"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
