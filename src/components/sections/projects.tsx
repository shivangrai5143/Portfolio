"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/project-card";
import CurrentProject from "@/components/current-project";
import { getCollection } from "@/lib/firestore";
import type { GitHubRepo, FirestoreProject } from "@/types";
import { Search } from "lucide-react";

// ── Skeleton Card ──────────────────────────────────────────────────────────
const SkeletonCard = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"
        style={{ width: `${100 - i * 20}%` }}
      />
    ))}
  </div>
);

// ── Constants ──────────────────────────────────────────────────────────────
const FILTERS = ["All", "Featured", "Full Stack", "Frontend", "Backend"] as const;
type FilterType = (typeof FILTERS)[number];

// ── Props ──────────────────────────────────────────────────────────────────
interface ProjectsProps {
  githubData: {
    current: GitHubRepo | null;
    loading: boolean;
    error: string | null;
  };
}

// ── Component ──────────────────────────────────────────────────────────────
const Projects = ({ githubData }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loadingDb, setLoadingDb] = useState(true);

  const { current: latestRepo, loading: loadingGithub } = githubData;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getCollection<FirestoreProject>("projects");
        setProjects(data.sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0)));
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchProjects();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // 1. Search Query Match
      const matchesSearch =
        searchQuery === "" ||
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // 2. Filter Match
      if (activeFilter === "All") return true;
      if (activeFilter === "Featured") return p.featured;
      
      const techStackLower = (p.techStack ?? []).map(t => t.toLowerCase());
      
      if (activeFilter === "Frontend") {
        return techStackLower.some(t => ["react", "vue", "next.js", "tailwindcss", "html", "css"].includes(t));
      }
      if (activeFilter === "Backend") {
        return techStackLower.some(t => ["node.js", "express", "mongodb", "postgresql", "python", "fastify"].includes(t));
      }
      if (activeFilter === "Full Stack") {
        const hasFront = techStackLower.some(t => ["react", "vue", "next.js"].includes(t));
        const hasBack = techStackLower.some(t => ["node.js", "express", "mongodb", "postgresql", "firebase"].includes(t));
        return hasFront && hasBack;
      }

      return true;
    });
  }, [projects, activeFilter, searchQuery]);

  const isLoading = loadingGithub || loadingDb;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Real-time "Currently Working On" Card */}
        <div className="mb-10">
          <CurrentProject current={latestRepo} loading={loadingGithub} />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            {isLoading ? "Fetching Projects..." : "What I've built"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            A real-time showcase of my work — from full-stack apps to open-source contributions.
          </p>
        </motion.div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by name, description, or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium font-sans transition-all duration-300 border ${
                  activeFilter === f
                    ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "border-gray-200 dark:border-slate-700/50 text-gray-600 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-600 hover:text-gray-900 dark:hover:text-slate-200 bg-white dark:bg-slate-800/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                    <div className="h-48 bg-gray-200 dark:bg-slate-800 rounded-xl mb-4 animate-pulse" />
                    <SkeletonCard lines={3} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project as any} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!isLoading && filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <Search className="w-6 h-6 text-gray-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-slate-400 max-w-sm">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/shivangrai5143"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-gray-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-blue-400/5"
          >
            View More on GitHub →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
