"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { getCollection, setDocument, addDocument } from "@/lib/firestore";
import { ImageUpload } from "@/components/admin/image-upload";
import { siteConfig, ROLES } from "@/constants/site-config";
import type { HeroData } from "@/types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const HERO_FALLBACK: HeroData = {
  name: siteConfig.name,
  title: siteConfig.title,
  description: siteConfig.description,
  roles: [...ROLES],
  profilePhoto: "/assets/copy.jpeg",
  availableForWork: true,
};

export default function AdminHeroPage() {
  const [data, setData] = useState<HeroData>(HERO_FALLBACK);
  const [docId, setDocId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const docs = await getCollection<HeroData & { id: string }>("hero");
        if (docs.length > 0) {
          const { id, ...rest } = docs[0];
          setDocId(id);
          setData(rest as HeroData);
        }
      } catch (e) {
        console.warn("No hero data found, using fallback", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      if (docId) {
        await setDocument("hero", docId, data);
      } else {
        const newId = await addDocument("hero", data);
        setDocId(newId);
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
    }
  };

  const updateRole = (i: number, val: string) => {
    const roles = [...data.roles];
    roles[i] = val;
    setData((p) => ({ ...p, roles }));
  };
  const addRole = () => setData((p) => ({ ...p, roles: [...p.roles, ""] }));
  const removeRole = (i: number) =>
    setData((p) => ({ ...p, roles: p.roles.filter((_, idx) => idx !== i) }));

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Section</h1>
          <p className="text-slate-400 text-sm mt-1">
            Edit the top-of-page hero — name, title, roles, and profile photo.
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

      <div className="space-y-6">
        {/* Profile Photo */}
        <Card title="Profile Photo" description="Displayed in the hero section. Uploaded to Cloudinary.">
          <ImageUpload
            folder="profile"
            resourceType="image"
            value={data.profilePhoto}
            onUpload={(url) => setData((p) => ({ ...p, profilePhoto: url }))}
            label="Profile Photo"
            previewHeight={240}
          />
        </Card>

        {/* Basic Info */}
        <Card title="Basic Information">
          <div className="space-y-4">
            <Field label="Full Name">
              <input
                value={data.name}
                onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
                className={inputCls}
                placeholder="Shivang Rai"
              />
            </Field>
            <Field label="Title / Role">
              <input
                value={data.title}
                onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
                className={inputCls}
                placeholder="Full Stack Developer"
              />
            </Field>
            <Field label="Short Bio / Description">
              <textarea
                value={data.description}
                onChange={(e) => setData((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className={`${inputCls} resize-none`}
                placeholder="Building scalable web applications..."
              />
            </Field>
          </div>
        </Card>

        {/* Typing Roles */}
        <Card title="Typing Animation Roles" description="These cycle in the typing animation on the hero.">
          <div className="space-y-2">
            {data.roles.map((role, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={role}
                  onChange={(e) => updateRole(i, e.target.value)}
                  className={`flex-1 ${inputCls}`}
                  placeholder="e.g. Full Stack Developer"
                />
                <button
                  onClick={() => removeRole(i)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addRole}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <Plus size={16} /> Add role
            </button>
          </div>
        </Card>

        {/* Availability */}
        <Card title="Availability">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setData((p) => ({ ...p, availableForWork: !p.availableForWork }))}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${data.availableForWork ? "bg-emerald-500" : "bg-slate-700"}`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${data.availableForWork ? "translate-x-6" : "translate-x-0"}`}
              />
            </div>
            <span className="text-slate-300 text-sm">
              {data.availableForWork ? "Showing 'Open to opportunities' badge" : "Badge hidden"}
            </span>
          </label>
        </Card>
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors";

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="mb-4">
        <h2 className="text-white font-semibold">{title}</h2>
        {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
