"use client";

import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CertificationsPage() {
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCerts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("certifications")
        .select("*")
        .order("issue_date", { ascending: false });

      if (data) setCerts(data);
    }
    fetchCerts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mb-24"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
          Verified <span className="text-indigo-400">Excellence.</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          Professional certifications and credentials that validate my expertise
          across various domains of software engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[2rem] p-10 h-full flex flex-col hover:border-indigo-500/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <ShieldCheck size={120} />
              </div>

              <div className="w-16 h-16 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-indigo-400 mb-8 shadow-xl">
                <Award size={32} />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors leading-tight">
                  {cert.name}
                </h3>
                <p className="text-zinc-400 font-bold mb-6">{cert.issuer}</p>

                <div className="flex items-center gap-2 text-zinc-500 text-sm mb-8 font-medium">
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
                  className="inline-flex items-center gap-2 font-bold text-sm text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                >
                  View Credential{" "}
                  <ExternalLink
                    size={14}
                    className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                  />
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {certs.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <Award size={64} className="mx-auto text-zinc-800 mb-6" />
            <p className="text-zinc-500 text-xl font-medium">
              No certifications listed yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
