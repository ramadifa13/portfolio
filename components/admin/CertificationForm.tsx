"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import {
  createCertification,
  updateCertification,
} from "@/lib/actions/certifications";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Award, Calendar, Globe, Info } from "lucide-react";
import { useState } from "react";
import { Database } from "@/types/database";

type CertificationRow = Database["public"]["Tables"]["certifications"]["Row"];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  issuer: z.string().min(2, "Issuer is required"),
  issue_date: z.string().optional(),
  credential_url: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.string().length(0)),
});

type CertificationFormValues = z.infer<typeof formSchema>;

export function CertificationForm({
  initialData,
}: {
  initialData?: CertificationRow;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultValues: CertificationFormValues = initialData
    ? {
        name: initialData.name,
        issuer: initialData.issuer,
        issue_date: initialData.issue_date ?? "",
        credential_url: initialData.credential_url ?? "",
      }
    : {
      name: "",
      issuer: "",
      issue_date: "",
      credential_url: "",
    };

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(formSchema) as Resolver<CertificationFormValues>,
    defaultValues,
  });

  async function onSubmit(values: CertificationFormValues) {
    setLoading(true);
    try {
      if (initialData) {
        await updateCertification(initialData.id, values);
        toast.success("Certification updated successfully");
      } else {
        await createCertification(values);
        toast.success("New certification added to arsenal");
      }
      router.push("/admin/certifications");
      router.refresh();
    } catch {
      toast.error("Process failed. Please try again.");
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
              className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 border-purple-500/20 bg-purple-500/5 px-3 py-1"
            >
              Professional Credentials
            </Badge>
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              {initialData ? "Verify" : "Register"}{" "}
              <span className="text-purple-500">Certification.</span>
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 font-black shadow-lg shadow-purple-600/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Finalize Entry
            </Button>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Info size={16} className="text-zinc-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                Validation Details
              </h2>
            </div>

            <Card className="border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Award size={12} className="text-purple-400" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Certification Name
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Azure Solutions Architect"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-purple-500/50 h-12 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issuer"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Info size={12} className="text-zinc-500" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Authority / Issuer
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Microsoft / Coursera"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-purple-500/50 h-12 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="issue_date"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={12} className="text-zinc-500" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Validation Date
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-purple-500/50 h-12 font-medium block shadow-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="credential_url"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2 mb-2">
                          <Globe size={12} className="text-zinc-500" />
                          <FormLabel className="text-zinc-400 font-bold text-xs uppercase tracking-widest leading-none">
                            Verification URL
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="https://verify.cert.com/id"
                            {...field}
                            className="bg-zinc-950/50 border-white/5 focus:border-purple-500/50 h-12 font-medium"
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
