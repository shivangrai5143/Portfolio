"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2, Briefcase, GraduationCap } from "lucide-react";
import { getCollection, setDocument, deleteDocument } from "@/lib/firestore";
import { experiences as staticExp, education as staticEdu } from "@/constants/experience";

interface ExperienceDoc {
  id: string;
  type: "work" | "education";
  title: string;
  org: string;
  duration: string;
  badge: string;
  points: string[];
  tags: string[];
}

type ExpForm = {
  type: "work" | "education";
  title: string;
  org: string;
  duration: string;
  badge: string;
  points: string;
  tags: string;
};

const EMPTY: ExpForm = { type: "work", title: "", org: "", duration: "", badge: "Full-time", points: "", tags: "" };

export default function ExperienceAdmin() {
  const [items, setItems] = useState<ExperienceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"work" | "education">("work");
  const [editing, setEditing] = useState<ExperienceDoc | null>(null);
  const [form, setForm] = useState<ExpForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [seeded, setSeeded] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getCollection<ExperienceDoc>("experience");
    setItems(data);
    setLoading(false);
  };

  // Seed from static data on first open
  const seedFromStatic = async () => {
    const all = [...staticExp, ...staticEdu];
    for (const e of all) {
      await setDocument("experience", String(e.id), {
        type: e.type,
        title: e.title,
        org: e.org,
        duration: e.duration,
        badge: e.badge,
        points: e.points,
        tags: e.tags,
      });
    }
    setSeeded(true);
    load();
  };

  useEffect(() => { load(); }, []);

  const openEdit = (e: ExperienceDoc) => {
    setEditing(e);
    setForm({ type: e.type, title: e.title, org: e.org, duration: e.duration, badge: e.badge ?? "", points: e.points?.join("\n") ?? "", tags: e.tags?.join(", ") ?? "" });
    setShowForm(true);
  };

  const openNew = () => { setEditing(null); setForm({ ...EMPTY, type: tab }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const id = editing?.id ?? `${form.type}-${Date.now()}`;
    await setDocument("experience", id, {
      ...form,
      points: form.points.split("\n").map((p) => p.trim()).filter(Boolean),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    setDeletingId(id);
    await deleteDocument("experience", id);
    setDeletingId(null);
    load();
  };

  const filtered = items.filter((i) => i.type === tab);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase size={22} className="text-emerald-400" /> Experience
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{items.length} total entries</p>
        </div>
        <div className="flex gap-2">
          {items.length === 0 && !seeded && (
            <button onClick={seedFromStatic} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl text-sm transition-all">
              Import from Code
            </button>
          )}
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25">
            <Plus size={16} /> Add Entry
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-slate-800 pb-4">
        {(["work", "education"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "text-slate-400 hover:text-white"}`}>
            {t === "work" ? <Briefcase size={14} /> : <GraduationCap size={14} />}
            {t === "work" ? "Work" : "Education"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="text-emerald-500 animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">{item.badge}</span>
                  </div>
                  <p className="text-slate-400 text-sm">{item.org} · {item.duration}</p>
                  <ul className="mt-3 space-y-1">
                    {(item.points ?? []).slice(0, 3).map((p, i) => (
                      <li key={i} className="text-slate-400 text-xs flex gap-2">
                        <span className="text-emerald-400 shrink-0">•</span>{p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {(item.tags ?? []).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-1.5 text-slate-500 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => handleDelete(item.id)} disabled={deletingId === item.id} className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors">
                    {deletingId === item.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500 text-sm">
              No entries yet.{items.length === 0 && " Click 'Import from Code' to seed from your existing data."}
            </div>
          )}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold">{editing ? "Edit Entry" : "Add Entry"}</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "work" | "education" })} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500">
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                  </select>
                </div>
                {[
                  { key: "title", label: "Title / Role", placeholder: "Software Engineer Intern" },
                  { key: "org", label: form.type === "work" ? "Company" : "Institution", placeholder: form.type === "work" ? "Acme Corp" : "MIT" },
                  { key: "duration", label: "Duration", placeholder: "Jan 2024 – Jun 2024" },
                  { key: "badge", label: "Badge", placeholder: "Remote / Full-time" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-slate-300 text-sm mb-1">{label}</label>
                    <input required value={form[key as keyof ExpForm] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Bullet Points (one per line)</label>
                  <textarea value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} rows={4} placeholder="Built X using Y…&#10;Improved Z by 30%…" className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 resize-none transition-all" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Node.js, PostgreSQL" className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition-all">Cancel</button>
                  <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all">
                    {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                    {saving ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
