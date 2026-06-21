"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Loader2, Cpu } from "lucide-react";
import { getCollection, setDocument, deleteDocument } from "@/lib/firestore";
import type { FirestoreSkill } from "@/types";

const CATEGORIES = ["Frontend", "Backend", "Tools & DevOps"] as const;

type SkillForm = {
  name: string;
  category: string;
  icon: string;
  color: string;
  proficiency: number;
};

const EMPTY: SkillForm = { name: "", category: "Frontend", icon: "", color: "#60a5fa", proficiency: 80 };

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<(FirestoreSkill & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [editing, setEditing] = useState<(FirestoreSkill & { id: string }) | null>(null);
  const [form, setForm] = useState<SkillForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getCollection<FirestoreSkill & { id: string }>("skills");
    setSkills(data.sort((a, b) => (b.proficiency ?? 0) - (a.proficiency ?? 0)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openEdit = (s: FirestoreSkill & { id: string }) => {
    setEditing(s);
    setForm({ name: s.name, category: s.category, icon: s.icon ?? "", color: s.color ?? "#60a5fa", proficiency: s.proficiency ?? 80 });
    setShowForm(true);
  };

  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const id = editing?.id ?? form.name.toLowerCase().replace(/\s+/g, "-");
    await setDocument("skills", id, { ...form });
    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    setDeletingId(id);
    await deleteDocument("skills", id);
    setDeletingId(null);
    load();
  };

  const tabs = ["All", ...CATEGORIES];
  const filtered = skills.filter((s) => activeTab === "All" || s.category === activeTab);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Cpu size={22} className="text-violet-400" /> Skills
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{skills.length} total skills detected</p>
        </div>
        <button suppressHydrationWarning onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-violet-500/25">
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-slate-800 pb-4">
        {tabs.map((tab) => (
          <button suppressHydrationWarning
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-violet-500/15 text-violet-400 border border-violet-500/20" : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 size={24} className="text-violet-500 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <motion.div key={s.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold" style={{ color: s.color ?? "#60a5fa" }}>
                  {s.name?.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{s.name}</p>
                <p className="text-slate-500 text-xs">{s.category}</p>
                <div className="mt-1.5 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-violet-500" style={{ width: `${s.proficiency ?? 80}%` }} />
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button suppressHydrationWarning onClick={() => openEdit(s)} className="p-1.5 text-slate-500 hover:text-violet-400 rounded-lg hover:bg-slate-800 transition-colors"><Pencil size={14} /></button>
                <button suppressHydrationWarning onClick={() => handleDelete(s.id)} disabled={deletingId === s.id} className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors">
                  {deletingId === s.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && <div className="col-span-3 text-center py-16 text-slate-500 text-sm">No skills in this category.</div>}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold">{editing ? "Edit Skill" : "Add Skill"}</h2>
                <button suppressHydrationWarning onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Skill Name</label>
                  <input suppressHydrationWarning required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="React" className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500 transition-all" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500 transition-all">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Proficiency ({form.proficiency}%)</label>
                  <input suppressHydrationWarning type="range" min={10} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })} className="w-full accent-violet-500" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Color</label>
                  <div className="flex items-center gap-3">
                    <input suppressHydrationWarning type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer" />
                    <input suppressHydrationWarning value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button suppressHydrationWarning type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition-all">Cancel</button>
                  <button suppressHydrationWarning type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-xl text-sm font-medium transition-all">
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
