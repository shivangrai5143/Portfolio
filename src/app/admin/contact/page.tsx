"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { getDocument, setDocument } from "@/lib/firestore";
import { siteConfig } from "@/constants/site-config";
import type { ContactInfo } from "@/types";

export default function AdminContactPage() {
  const [data, setData] = useState<ContactInfo>({
    email: siteConfig.email,
    linkedinUrl: siteConfig.linkedinUrl,
    twitterUrl: siteConfig.twitterUrl,
    githubUrl: siteConfig.githubUrl,
    githubUsername: siteConfig.githubUsername,
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const contact = await getDocument<ContactInfo>("settings", "contact");
        if (contact) {
          const { id: _id, ...rest } = contact as ContactInfo & { id?: string };
          setData(rest);
        }
      } catch (e) {
        console.warn("No contact settings found, using defaults", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await setDocument("settings", "contact", data);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
    }
  };

  const update = (key: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((p) => ({ ...p, [key]: e.target.value }));

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Information</h1>
          <p className="text-slate-400 text-sm mt-1">
            Update your public contact details and social links. These are reflected across the portfolio.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20"
        >
          {saveStatus === "saving" ? <Loader2 size={15} className="animate-spin" /> : saveStatus === "saved" ? <CheckCircle2 size={15} /> : <Save size={15} />}
          {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save Changes"}
        </button>
      </motion.div>

      {saveStatus === "error" && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          Failed to save. Please try again.
        </div>
      )}

      <div className="space-y-5">
        {/* Contact Fields */}
        {[
          { key: "email" as const, label: "Email Address", placeholder: "you@example.com", type: "email" },
          { key: "githubUsername" as const, label: "GitHub Username", placeholder: "your-username", type: "text" },
          { key: "githubUrl" as const, label: "GitHub Profile URL", placeholder: "https://github.com/username", type: "url" },
          { key: "linkedinUrl" as const, label: "LinkedIn Profile URL", placeholder: "https://linkedin.com/in/username", type: "url" },
          { key: "twitterUrl" as const, label: "Twitter / X Profile URL", placeholder: "https://x.com/username", type: "url" },
        ].map(({ key, label, placeholder, type }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
            <input
              type={type}
              value={data[key] || ""}
              onChange={update(key)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder={placeholder}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
