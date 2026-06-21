"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Star, StarOff, ExternalLink, Github,
  Search, X, Save, Loader2, FolderOpen, GitFork, Users,
} from "lucide-react";
import { getCollection, setDocument, deleteDocument } from "@/lib/firestore";
import type { FirestoreProject } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectForm = {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
};

interface Contribution {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  owner: { login: string; avatar_url: string };
  myForkUrl?: string | null;
}

const EMPTY: ProjectForm = {
  title: "", description: "", techStack: "", githubUrl: "", liveUrl: "", featured: false,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsAdmin() {
  // My projects (Firestore)
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Contributions (GitHub API)
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loadingContribs, setLoadingContribs] = useState(false);
  const [contribsFetched, setContribsFetched] = useState(false);

  // UI state
  const [tab, setTab] = useState<"mine" | "contributions">("mine");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<FirestoreProject | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // ── Load my projects from Firestore
  const loadProjects = async () => {
    setLoadingProjects(true);
    const data = await getCollection<FirestoreProject>("projects");
    setProjects(data.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0)));
    setLoadingProjects(false);
  };

  // ── Lazy-load contributions when tab is clicked
  const loadContributions = async () => {
    if (contribsFetched) return;
    setLoadingContribs(true);
    try {
      const res = await fetch("/api/github/contributions");
      const data = await res.json();
      setContributions(data.contributions ?? []);
      setContribsFetched(true);
    } finally {
      setLoadingContribs(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

  const handleTabChange = (t: "mine" | "contributions") => {
    setTab(t);
    setSearch("");
    if (t === "contributions") loadContributions();
  };

  // ── CRUD handlers
  const openNew = () => { setEditing(null); setForm(EMPTY); setShowForm(true); };
  const openEdit = (p: FirestoreProject) => {
    setEditing(p);
    setForm({
      title: p.title ?? "", description: p.description ?? "",
      techStack: (p.techStack ?? []).join(", "),
      githubUrl: p.githubUrl ?? "", liveUrl: p.liveUrl ?? "",
      featured: p.featured ?? false,
    });
    setShowForm(true);
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const id = editing?.id ?? form.title.toLowerCase().replace(/\s+/g, "-");
    const techStack = form.techStack.split(",").map((t) => t.trim()).filter(Boolean);
    await setDocument("projects", id, { ...form, techStack, id });
    setSaving(false); setShowForm(false); loadProjects();
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    setDeletingId(id);
    await deleteDocument("projects", id);
    setDeletingId(null); loadProjects();
  };
  const toggleFeatured = async (p: FirestoreProject) => {
    await setDocument("projects", p.id, { ...p, featured: !p.featured });
    loadProjects();
  };

  // ── Import a contribution into Firestore as a project
  const importContribution = async (c: Contribution) => {
    const id = c.name.toLowerCase().replace(/\s+/g, "-") + "-contrib";
    await setDocument("projects", id, {
      id,
      title: c.name,
      description: c.description ?? "",
      techStack: c.language ? [c.language] : [],
      githubUrl: c.html_url,
      liveUrl: c.homepage ?? "",
      featured: false,
      stars: c.stargazers_count,
      isContribution: true,
    });
    alert(`"${c.name}" imported to your projects!`);
    loadProjects();
  };

  const filteredProjects = projects.filter(
    (p) => p.title?.toLowerCase().includes(search.toLowerCase()) ||
           p.description?.toLowerCase().includes(search.toLowerCase())
  );
  const filteredContribs = contributions.filter(
    (c) => c.name?.toLowerCase().includes(search.toLowerCase()) ||
           (c.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderOpen size={22} className="text-blue-400" /> Projects
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {tab === "mine" ? `${projects.length} synced projects` : `${contributions.length} contribution repos`}
          </p>
        </div>
        {tab === "mine" && (
          <button suppressHydrationWarning onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-500/25">
            <Plus size={16} /> Add Project
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-slate-800 pb-4">
        <button suppressHydrationWarning
          onClick={() => handleTabChange("mine")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "mine" ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:text-white"
          }`}
        >
          <Github size={14} /> My Projects
        </button>
        <button suppressHydrationWarning
          onClick={() => handleTabChange("contributions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "contributions" ? "bg-violet-500/15 text-violet-400 border border-violet-500/20" : "text-slate-400 hover:text-white"
          }`}
        >
          <Users size={14} /> Contributions
          {contributions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-medium">
              {contributions.length}
            </span>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input suppressHydrationWarning
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === "mine" ? "Search projects…" : "Search contributions…"}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-all"
        />
      </div>

      {/* ── MY PROJECTS TAB ─────────────────────────────────────────────────── */}
      {tab === "mine" && (
        loadingProjects ? (
          <div className="flex justify-center py-16"><Loader2 size={24} className="text-blue-500 animate-spin" /></div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-start gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-semibold text-sm truncate">{p.title}</h3>
                    {p.featured && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-medium border border-amber-500/20">Featured</span>
                    )}
                    {(p as any).isContribution && (
                      <span className="px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-medium border border-violet-500/20 flex items-center gap-1">
                        <GitFork size={10} /> Contributed
                      </span>
                    )}
                    {p.stars ? <span className="text-slate-500 text-[10px]">⭐ {p.stars}</span> : null}
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {(p.techStack ?? []).slice(0, 6).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md">{t}</span>
                    ))}
                    {(p.techStack?.length ?? 0) > 6 && (
                      <span className="px-1.5 py-0.5 bg-slate-800 text-slate-500 text-[10px] rounded-md">+{(p.techStack?.length ?? 0) - 6}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"><Github size={15} /></a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"><ExternalLink size={15} /></a>}
                  <button suppressHydrationWarning onClick={() => toggleFeatured(p)} className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${p.featured ? "text-amber-400" : "text-slate-500 hover:text-amber-400"}`}>
                    {p.featured ? <Star size={15} /> : <StarOff size={15} />}
                  </button>
                  <button suppressHydrationWarning onClick={() => openEdit(p)} className="p-1.5 text-slate-500 hover:text-blue-400 rounded-lg hover:bg-slate-800 transition-colors"><Pencil size={15} /></button>
                  <button suppressHydrationWarning onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors">
                    {deletingId === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </motion.div>
            ))}
            {filteredProjects.length === 0 && <div className="text-center py-16 text-slate-500 text-sm">No projects found.</div>}
          </div>
        )
      )}

      {/* ── CONTRIBUTIONS TAB ───────────────────────────────────────────────── */}
      {tab === "contributions" && (
        loadingContribs ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 size={24} className="text-violet-500 animate-spin" />
            <p className="text-slate-500 text-sm">Fetching your GitHub contributions…</p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Info banner */}
            <div className="flex items-start gap-3 p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl mb-2">
              <GitFork size={16} className="text-violet-400 shrink-0 mt-0.5" />
              <p className="text-slate-400 text-sm">
                These are repositories you&apos;ve <strong className="text-violet-300">forked or contributed to</strong> on GitHub.
                Click <strong className="text-white">Import</strong> to add them to your Projects list.
              </p>
            </div>

            {filteredContribs.map((c, i) => (
              <motion.div key={c.html_url} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-start gap-4"
              >
                {/* Owner avatar */}
                <img src={c.owner.avatar_url} alt={c.owner.login} className="w-9 h-9 rounded-full border border-slate-700 shrink-0 mt-0.5" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-semibold text-sm">{c.name}</h3>
                    <span className="text-slate-500 text-xs">by @{c.owner.login}</span>
                    {c.language && (
                      <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md">{c.language}</span>
                    )}
                    {c.stargazers_count > 0 && (
                      <span className="text-slate-500 text-[10px]">⭐ {c.stargazers_count.toLocaleString()}</span>
                    )}
                    {c.forks_count > 0 && (
                      <span className="text-slate-500 text-[10px] flex items-center gap-0.5"><GitFork size={10} /> {c.forks_count.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-2">{c.description || "No description"}</p>
                  {c.topics?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {c.topics.slice(0, 5).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md">{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {c.myForkUrl && (
                    <a href={c.myForkUrl} target="_blank" title="My fork" className="p-1.5 text-violet-400 hover:text-violet-300 rounded-lg hover:bg-slate-800 transition-colors">
                      <GitFork size={15} />
                    </a>
                  )}
                  <a href={c.html_url} target="_blank" className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                    <ExternalLink size={15} />
                  </a>
                  <button suppressHydrationWarning
                    onClick={() => importContribution(c)}
                    className="px-3 py-1.5 bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 border border-violet-500/20 rounded-lg text-xs font-medium transition-all"
                  >
                    Import
                  </button>
                </div>
              </motion.div>
            ))}
            {filteredContribs.length === 0 && !loadingContribs && (
              <div className="text-center py-16 text-slate-500 text-sm">
                No contributions found. This uses GitHub Search API which may have a slight delay.
              </div>
            )}
          </div>
        )
      )}

      {/* ── FORM MODAL ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold">{editing ? "Edit Project" : "Add Project"}</h2>
                <button suppressHydrationWarning onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                {[
                  { key: "title", label: "Title", placeholder: "My Cool Project" },
                  { key: "githubUrl", label: "GitHub URL", placeholder: "https://github.com/..." },
                  { key: "liveUrl", label: "Live URL", placeholder: "https://..." },
                  { key: "techStack", label: "Tech Stack (comma-separated)", placeholder: "React, Node.js, MongoDB" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-slate-300 text-sm mb-1">{label}</label>
                    <input suppressHydrationWarning value={form[key as keyof ProjectForm] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-slate-300 text-sm mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3} placeholder="Describe the project…"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input suppressHydrationWarning type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-blue-500" />
                  <span className="text-slate-300 text-sm">Featured on homepage</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button suppressHydrationWarning type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition-all">Cancel</button>
                  <button suppressHydrationWarning type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all">
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
