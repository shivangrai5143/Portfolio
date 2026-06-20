"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen, Cpu, Briefcase, RefreshCw, CheckCircle2,
  XCircle, Clock, Activity, TrendingUp, Zap,
} from "lucide-react";
import { getCollection, orderBy, limit } from "@/lib/firestore";
import { triggerGitHubSync } from "@/actions/github";
import { useAuth } from "@/contexts/auth-context";

interface SyncLog {
  id: string;
  status: "success" | "error";
  startedAt: string;
  completedAt: string;
  durationMs: number;
  message?: string;
  error?: string;
  projectsSynced?: number;
  skillsSynced?: number;
}

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

function StatCard({ label, value, icon: Icon, color, bg }: StatCard) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4"
    >
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon size={22} className={color} />
      </div>
      <div>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<SyncLog[]>([]);
  const [counts, setCounts] = useState({ projects: 0, skills: 0, experience: 0 });
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  useEffect(() => {
    async function load() {
      const [logsData, projects, skills, experience] = await Promise.all([
        getCollection<SyncLog>("syncLogs", orderBy("timestamp", "desc"), limit(10)),
        getCollection("projects"),
        getCollection("skills"),
        getCollection("experience"),
      ]);
      setLogs(logsData);
      setCounts({ projects: projects.length, skills: skills.length, experience: experience.length });
    }
    load();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg("");
    try {
      const result = await triggerGitHubSync();
      if (result.success) {
        setSyncMsg(`✓ Synced ${result.count} projects successfully!`);
        // Refresh logs
        const newLogs = await getCollection<SyncLog>("syncLogs", orderBy("timestamp", "desc"), limit(10));
        setLogs(newLogs);
        setCounts((prev) => ({ ...prev, projects: result.count }));
      } else {
        setSyncMsg(`✗ Sync failed: ${result.error}`);
      }
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMsg(""), 5000);
    }
  };

  const stats: StatCard[] = [
    { label: "Projects", value: counts.projects, icon: FolderOpen, color: "text-blue-400", bg: "bg-blue-500/15" },
    { label: "Skills", value: counts.skills, icon: Cpu, color: "text-violet-400", bg: "bg-violet-500/15" },
    { label: "Experience Entries", value: counts.experience, icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/15" },
    { label: "Sync Logs", value: logs.length, icon: Activity, color: "text-amber-400", bg: "bg-amber-500/15" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user?.displayName?.split(" ")[0] ?? "Admin";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {greeting}, {firstName} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Here's an overview of your portfolio platform.
            </p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-all shadow-lg shadow-blue-500/25"
          >
            <RefreshCw size={15} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing…" : "Sync GitHub"}
          </button>
        </div>
        {syncMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
              syncMsg.startsWith("✓")
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {syncMsg}
          </motion.div>
        )}
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Sync Logs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800">
          <Zap size={16} className="text-amber-400" />
          <h2 className="text-white font-semibold text-sm">Recent Sync Activity</h2>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No sync logs yet. Run a sync to see activity here.
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-4 px-6 py-3.5">
                {log.status === "success" ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                ) : (
                  <XCircle size={16} className="text-red-400 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {log.status === "success"
                      ? `Synced ${log.projectsSynced ?? "?"} projects, ${log.skillsSynced ?? "?"} skills`
                      : log.error ?? "Sync error"}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {log.startedAt
                      ? new Date(log.startedAt).toLocaleString()
                      : "Unknown time"}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs shrink-0">
                  <Clock size={12} />
                  {log.durationMs ? `${(log.durationMs / 1000).toFixed(1)}s` : "—"}
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    log.status === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { href: "/admin/projects", label: "Manage Projects", icon: FolderOpen, desc: "Edit or feature projects" },
          { href: "/admin/skills", label: "Manage Skills", icon: Cpu, desc: "Update your tech stack" },
          { href: "/admin/experience", label: "Manage Experience", icon: Briefcase, desc: "Add work & education" },
        ].map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.07 }}
            className="group bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 transition-all hover:bg-slate-800/60"
          >
            <item.icon size={20} className="text-blue-400 mb-3" />
            <p className="text-white font-medium text-sm">{item.label}</p>
            <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
