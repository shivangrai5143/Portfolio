"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { getCollection, setDocument, addDocument } from "@/lib/firestore";
import { aboutFallback } from "@/data/about";
import type { AboutData } from "@/types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function AdminAboutPage() {
  const [data, setData] = useState<AboutData>(aboutFallback);
  const [docId, setDocId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const docs = await getCollection<AboutData & { id: string }>("about");
        if (docs.length > 0) {
          const { id, ...rest } = docs[0];
          setDocId(id);
          setData(rest as AboutData);
        }
      } catch (e) {
        console.warn("No about data found, using fallback", e);
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
        await setDocument("about", docId, data);
      } else {
        const newId = await addDocument("about", data);
        setDocId(newId);
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
    }
  };

  // Bio paragraph helpers
  const updateBio = (index: number, value: string) => {
    const updated = [...data.bio];
    updated[index] = value;
    setData((p) => ({ ...p, bio: updated }));
  };
  const addBioPara = () => setData((p) => ({ ...p, bio: [...p.bio, ""] }));
  const removeBioPara = (i: number) =>
    setData((p) => ({ ...p, bio: p.bio.filter((_, idx) => idx !== i) }));

  // What I Bring helpers
  const updateBring = (index: number, value: string) => {
    const updated = [...data.whatIBring];
    updated[index] = value;
    setData((p) => ({ ...p, whatIBring: updated }));
  };
  const addBring = () => setData((p) => ({ ...p, whatIBring: [...p.whatIBring, ""] }));
  const removeBring = (i: number) =>
    setData((p) => ({ ...p, whatIBring: p.whatIBring.filter((_, idx) => idx !== i) }));

  // Looking For helpers
  const updateLookingFor = (field: string, value: string) =>
    setData((p) => ({ ...p, lookingFor: { ...p.lookingFor, [field]: value } }));
  const updateLFPoint = (index: number, value: string) => {
    const updated = [...data.lookingFor.points];
    updated[index] = value;
    setData((p) => ({ ...p, lookingFor: { ...p.lookingFor, points: updated } }));
  };
  const addLFPoint = () =>
    setData((p) => ({ ...p, lookingFor: { ...p.lookingFor, points: [...p.lookingFor.points, ""] } }));
  const removeLFPoint = (i: number) =>
    setData((p) => ({
      ...p,
      lookingFor: { ...p.lookingFor, points: p.lookingFor.points.filter((_, idx) => idx !== i) },
    }));

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">About Section</h1>
          <p className="text-slate-400 text-sm mt-1">Edit the content shown in the About Me section.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-500/20"
        >
          {saveStatus === "saving" ? (
            <Loader2 size={15} className="animate-spin" />
          ) : saveStatus === "saved" ? (
            <CheckCircle2 size={15} />
          ) : (
            <Save size={15} />
          )}
          {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save Changes"}
        </button>
      </motion.div>

      {saveStatus === "error" && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          Failed to save. Please try again.
        </div>
      )}

      <div className="space-y-8">
        {/* Availability Toggle */}
        <Section title="Availability">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setData((p) => ({ ...p, availableForWork: !p.availableForWork }))}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                data.availableForWork ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  data.availableForWork ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-slate-300 text-sm">
              {data.availableForWork ? "Available for work / opportunities" : "Not currently available"}
            </span>
          </label>
        </Section>

        {/* Bio Paragraphs */}
        <Section title="Bio Paragraphs" description="These appear in the 'My Story' card.">
          <div className="space-y-3">
            {data.bio.map((para, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  value={para}
                  onChange={(e) => updateBio(i, e.target.value)}
                  rows={3}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Write a bio paragraph..."
                />
                <button
                  onClick={() => removeBioPara(i)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors self-start"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addBioPara}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <Plus size={16} /> Add paragraph
            </button>
          </div>
        </Section>

        {/* What I Bring */}
        <Section title="What I Bring" description="Bullet points in the skills summary card.">
          <div className="space-y-2">
            {data.whatIBring.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateBring(i, e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. Full-stack web development with MERN stack"
                />
                <button
                  onClick={() => removeBring(i)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addBring}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <Plus size={16} /> Add skill
            </button>
          </div>
        </Section>

        {/* Looking For */}
        <Section title="Looking For Section" description="The highlighted card at the bottom right.">
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Section Title</label>
              <input
                value={data.lookingFor.title}
                onChange={(e) => updateLookingFor("title", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Description</label>
              <textarea
                value={data.lookingFor.description}
                onChange={(e) => updateLookingFor("description", e.target.value)}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Points</label>
              <div className="space-y-2">
                {data.lookingFor.points.map((pt, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={pt}
                      onChange={(e) => updateLFPoint(i, e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g. Work on challenging real-world projects"
                    />
                    <button
                      onClick={() => removeLFPoint(i)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addLFPoint}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  <Plus size={16} /> Add point
                </button>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
    >
      <div className="mb-4">
        <h2 className="text-white font-semibold">{title}</h2>
        {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}
