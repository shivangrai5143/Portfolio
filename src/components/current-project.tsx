"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { HiSparkles, HiClock } from "react-icons/hi2";
import SkeletonCard, { SkeletonPill } from "@/components/skeleton-card";
import type { GitHubRepo } from "@/types";

// ── Language accent colors ───────────────────────────────────────────────────
const LANG_COLORS: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  JavaScript: {
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
    text: "text-yellow-400",
    dot: "#F7DF1E",
  },
  TypeScript: {
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    text: "text-blue-400",
    dot: "#3178C6",
  },
  Python: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    dot: "#3776AB",
  },
  Java: {
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
    text: "text-orange-400",
    dot: "#F89820",
  },
  "C++": {
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/30",
    text: "text-indigo-400",
    dot: "#00599C",
  },
  Go: {
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    text: "text-cyan-400",
    dot: "#00ADD8",
  },
  Rust: {
    bg: "bg-red-400/10",
    border: "border-red-400/30",
    text: "text-red-400",
    dot: "#CE4A1D",
  },
};

const DEFAULT_LANG = {
  bg: "bg-slate-400/10",
  border: "border-slate-400/30",
  text: "text-slate-400",
  dot: "#94a3b8",
};

// Human-readable relative time
function timeAgo(dateStr: string | undefined): string | null {
  if (!dateStr) return null;
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Clean up repo name for display
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Skeleton state ───────────────────────────────────────────────────────────
function CurrentProjectSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex-1">
            {/* Badge */}
            <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse mb-4" />
            <SkeletonCard lines={3} />
          </div>
          <div className="flex gap-2 shrink-0">
            <SkeletonPill width="w-20" />
            <SkeletonPill width="w-16" />
            <SkeletonPill width="w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
interface CurrentProjectProps {
  current: GitHubRepo | null;
  loading: boolean;
}

const CurrentProject = ({ current, loading }: CurrentProjectProps) => {
  // Don't render anything if not loading and no data
  if (!loading && !current) return null;

  if (loading) return <CurrentProjectSkeleton />;

  // At this point, current is guaranteed non-null
  const repo = current!;
  const lang = repo.language;
  const langStyle = (lang && LANG_COLORS[lang]) || DEFAULT_LANG;
  const pushed = timeAgo(repo.updatedAt);

  return (
    <AnimatePresence>
      <motion.section
        id="current-project"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-white/60 to-blue-500/5 dark:from-emerald-500/5 dark:via-slate-900/60 dark:to-blue-500/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
              {/* ── Left: Badge + name + description ── */}
              <div className="flex-1 min-w-0">
                {/* "Currently Working On" badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold font-sans tracking-wider uppercase mb-3">
                  <HiSparkles className="text-sm" />
                  Currently Working On
                </div>

                {/* Repo name */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 dark:text-white truncate mb-1.5">
                  {formatRepoName(repo.name)}
                </h3>

                {/* Description */}
                {repo.description && (
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                )}

                {/* Meta row: time + stars + forks */}
                <div className="flex items-center flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-slate-500 font-sans">
                  {pushed && (
                    <span className="flex items-center gap-1.5">
                      <HiClock className="text-sm" />
                      Last pushed {pushed}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1.5">
                      <FaStar className="text-amber-400" />
                      {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="flex items-center gap-1.5">
                      <FaCodeBranch className="text-slate-400" />
                      {repo.forks}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Right: Language + topics + CTA ── */}
              <div className="flex flex-col gap-3 shrink-0">
                {/* Language badge */}
                {lang && (
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${langStyle.bg} ${langStyle.border} ${langStyle.text}`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: langStyle.dot }}
                      />
                      {lang}
                    </span>

                    {/* Topics (first 3) */}
                    {(repo.topics || []).slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* GitHub CTA */}
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-semibold transition-all duration-200 hover:shadow-lg"
                >
                  <FaGithub size={15} />
                  View on GitHub
                  <FaExternalLinkAlt size={10} className="opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default CurrentProject;
