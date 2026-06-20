"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Settings, User, Globe, Link2, RefreshCw } from "lucide-react";
import { getDocument, setDocument } from "@/lib/firestore";
import { useAuth } from "@/contexts/auth-context";

interface SiteSettings {
  name: string;
  email: string;
  title: string;
  description: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  siteUrl: string;
  location: string;
  phone: string;
  syncCooldownMinutes: number;
}

const DEFAULT: SiteSettings = {
  name: "Shivang Rai",
  email: "raishivang69@gmail.com",
  title: "Full Stack Developer",
  description: "Building scalable, interactive web applications with modern technologies.",
  githubUsername: "shivangrai5143",
  githubUrl: "https://github.com/shivangrai5143",
  linkedinUrl: "https://linkedin.com/in/shivang-rai-58b45728b",
  twitterUrl: "https://x.com/raishivang_69",
  siteUrl: "https://shivang-2005.vercel.app",
  location: "Lucknow, India",
  phone: "",
  syncCooldownMinutes: 10,
};

export default function SettingsAdmin() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getDocument<SiteSettings>("settings", "site");
      if (data) setSettings({ ...DEFAULT, ...data });
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await setDocument("settings", "site", settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({
    label, fieldKey, placeholder, type = "text", multiline = false,
  }: { label: string; fieldKey: keyof SiteSettings; placeholder?: string; type?: string; multiline?: boolean }) => (
    <div>
      <label className="block text-slate-300 text-sm font-medium mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={settings[fieldKey] as string}
          onChange={(e) => setSettings({ ...settings, [fieldKey]: e.target.value })}
          rows={3}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          value={settings[fieldKey] as string | number}
          onChange={(e) => setSettings({ ...settings, [fieldKey]: type === "number" ? Number(e.target.value) : e.target.value })}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
        />
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 size={24} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings size={22} className="text-blue-400" /> Settings
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your portfolio site configuration</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <User size={16} className="text-blue-400" />
            <h2 className="text-white font-semibold text-sm">Personal Info</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" fieldKey="name" placeholder="Shivang Rai" />
            <Field label="Title" fieldKey="title" placeholder="Full Stack Developer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" fieldKey="email" type="email" placeholder="you@email.com" />
            <Field label="Phone" fieldKey="phone" placeholder="+91 XXXXX XXXXX" />
          </div>
          <Field label="Location" fieldKey="location" placeholder="Lucknow, India" />
          <Field label="Bio / Summary" fieldKey="description" multiline placeholder="A short bio for your resume and site..." />
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Link2 size={16} className="text-blue-400" />
            <h2 className="text-white font-semibold text-sm">Social & Links</h2>
          </div>
          <Field label="GitHub Username" fieldKey="githubUsername" placeholder="shivangrai5143" />
          <Field label="GitHub URL" fieldKey="githubUrl" placeholder="https://github.com/..." />
          <Field label="LinkedIn URL" fieldKey="linkedinUrl" placeholder="https://linkedin.com/in/..." />
          <Field label="Twitter / X URL" fieldKey="twitterUrl" placeholder="https://x.com/..." />
        </motion.div>

        {/* Site */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={16} className="text-blue-400" />
            <h2 className="text-white font-semibold text-sm">Site Configuration</h2>
          </div>
          <Field label="Site URL" fieldKey="siteUrl" placeholder="https://yourdomain.com" />
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1.5">
              Sync Cooldown (minutes)
            </label>
            <div className="flex items-center gap-3">
              <RefreshCw size={16} className="text-slate-400 shrink-0" />
              <input
                type="number"
                min={1}
                max={60}
                value={settings.syncCooldownMinutes}
                onChange={(e) => setSettings({ ...settings, syncCooldownMinutes: Number(e.target.value) })}
                className="w-24 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
              <span className="text-slate-400 text-sm">minutes between syncs</span>
            </div>
          </div>
        </motion.div>

        {/* Admin Account (read-only) */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-slate-400" />
            <h2 className="text-white font-semibold text-sm">Admin Account</h2>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.displayName || "Admin"}</p>
              <p className="text-slate-400 text-xs">{user?.email}</p>
            </div>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">
              Admin
            </span>
          </div>
        </motion.div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
              saved
                ? "bg-emerald-500 shadow-emerald-500/25"
                : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/25 hover:shadow-blue-500/40"
            } text-white`}
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              "✓ Saved!"
            ) : (
              <><Save size={16} /> Save Changes</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
