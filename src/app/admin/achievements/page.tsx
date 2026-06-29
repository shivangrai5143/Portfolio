"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil, Loader2, Save, X, Trophy } from "lucide-react";
import { getCollection, addDocument, setDocument, deleteDocument } from "@/lib/firestore";
import { achievementsFallback } from "@/data/achievements";
import type { Achievement } from "@/types";

const CATEGORIES: Achievement["category"][] = [
  "Hackathon", "Award", "Open Source", "Academic", "Community", "Other",
];

const EMPTY: Omit<Achievement, "id"> = {
  title: "",
  description: "",
  date: "",
  icon: "",
  category: "Other",
  link: "",
  featured: false,
};

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Achievement, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await getCollection<Achievement>("achievements");
      setItems(data.length > 0 ? data : achievementsFallback);
    } catch {
      setItems(achievementsFallback);
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => { setEditingId(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (item: Achievement) => {
    setEditingId(item.id);
    const { id: _id, ...rest } = item;
    setForm(rest);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title) return;
    setSaving(true);
    try {
      if (editingId) {
        await setDocument("achievements", editingId, form);
        setItems((prev) => prev.map((a) => a.id === editingId ? { ...form, id: editingId } : a));
      } else {
        const id = await addDocument("achievements", form);
        setItems((prev) => [...prev, { ...form, id }]);
      }
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteDocument("achievements", id);
      setItems((prev) => prev.filter((a) => a.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const categoryColors: Record<Achievement["category"], string> = {
    Hackathon: "bg-violet-500/10 text-violet-400",
    Award: "bg-amber-500/10 text-amber-400",
    "Open Source": "bg-emerald-500/10 text-emerald-400",
    Academic: "bg-blue-500/10 text-blue-400",
    Community: "bg-pink-500/10 text-pink-400",
    Other: "bg-slate-500/10 text-slate-400",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Achievements</h1>
          <p className="text-slate-400 text-sm mt-1">Showcase your accomplishments, awards, and milestones.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20">
          <Plus size={16} /> Add Achievement
        </button>
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">{editingId ? "Edit Achievement" : "Add Achievement"}</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
              </div>

              <div className="space-y-4">
                <FF label="Title *">
                  <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className={inp} placeholder="e.g. Won Hackathon 2024" />
                </FF>
                <FF label="Description">
                  <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} className={`${inp} resize-none`} placeholder="Brief description of this achievement..." />
                </FF>
                <div className="grid grid-cols-2 gap-4">
                  <FF label="Category">
                    <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Achievement["category"] }))} className={inp}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FF>
                  <FF label="Date">
                    <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className={inp} />
                  </FF>
                </div>
                <FF label="Icon (emoji or leave blank)">
                  <input value={form.icon || ""} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} className={inp} placeholder="🏆" />
                </FF>
                <FF label="Link (optional)">
                  <input value={form.link || ""} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} className={inp} placeholder="https://..." />
                </FF>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.featured || false} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-blue-500" />
                  <span className="text-slate-300 text-sm">Feature this achievement</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-slate-700 text-slate-300 rounded-xl text-sm hover:bg-slate-800 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.title} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white rounded-xl text-sm font-medium transition-all">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-400" size={32} /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Trophy size={40} className="mx-auto mb-4 opacity-50" />
          <p>No achievements yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg shrink-0">
                {item.icon || "🏆"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[item.category]}`}>{item.category}</span>
                  {item.featured && <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">Featured</span>}
                </div>
                <p className="text-slate-400 text-xs mt-0.5 truncate">{item.description}</p>
              </div>
              <p className="text-slate-500 text-xs shrink-0">{item.date}</p>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item.id)} disabled={deletingId === item.id} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  {deletingId === item.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

const inp = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors";
function FF({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs text-slate-400 mb-1.5">{label}</label>{children}</div>;
}
