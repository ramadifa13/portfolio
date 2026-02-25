"use client";

import { createClient } from "@/lib/supabase/client";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
}

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    async function fetchCerts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("certifications")
        .select("id,name,issuer,issue_date,credential_url")
        .order("issue_date", { ascending: false });

      if (data) setCerts(data as Certification[]);
    }
    fetchCerts();
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 max-w-3xl md:mb-24"
      >
        <h1 className="mb-6 text-4xl leading-tight font-black text-foreground sm:text-5xl md:mb-8 md:text-7xl">
          Verified <span className="text-sky-600 dark:text-indigo-400">Excellence.</span>
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground md:text-xl">
          Professional certifications and credentials that validate my expertise
          across various domains of software engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {certs.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-border/70 bg-card/72 p-7 transition-all hover:border-sky-500/30 md:rounded-[2rem] md:p-10 dark:hover:border-indigo-500/30">
              <div className="absolute right-0 top-0 p-6 opacity-[0.03] transition-opacity group-hover:opacity-[0.06] md:p-8">
                <ShieldCheck size={120} />
              </div>

              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background text-sky-600 shadow-xl dark:text-indigo-400 md:mb-8 md:h-16 md:w-16">
                <Award size={28} />
              </div>

              <div className="flex-1">
                <h3 className="mb-3 text-xl leading-tight font-black text-foreground transition-colors group-hover:text-sky-600 dark:group-hover:text-indigo-400 md:text-2xl">
                  {cert.name}
                </h3>
                <p className="mb-5 font-bold text-muted-foreground md:mb-6">
                  {cert.issuer}
                </p>

                <div className="mb-7 flex items-center gap-2 text-sm font-medium text-muted-foreground md:mb-8">
                  <Calendar size={14} />
                  Issued{" "}
                  {cert.issue_date
                    ? new Date(cert.issue_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>

              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-sm font-bold text-sky-600 transition-colors hover:text-sky-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  View Credential{" "}
                  <ExternalLink
                    size={14}
                    className="transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                  />
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {certs.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Award size={64} className="mx-auto mb-6 text-muted-foreground/35" />
            <p className="text-lg font-medium text-muted-foreground md:text-xl">
              No certifications listed yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
