"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/project-card";
import CurrentProject from "@/components/current-project";
import { projectsData as fallbackProjects } from "@/constants/projects";
import type { GitHubRepo, Project } from "@/types";

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
const FILTERS = ["All", "Featured", "Open Source"] as const;
type FilterType = (typeof FILTERS)[number];

// ── Props ──────────────────────────────────────────────────────────────────
interface ProjectsProps {
  githubData: {
    projects: GitHubRepo[] | null;
    current: GitHubRepo | null;
    loading: boolean;
    error: string | null;
  };
}

// ── Component ──────────────────────────────────────────────────────────────
const Projects = ({ githubData }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const { projects: githubProjects, current: latestRepo, loading } = githubData;

  // Only show projects defined in fallbackProjects, but enrich them with GitHub data
  const allProjects = useMemo((): Project[] => {
    // If GitHub data is still loading, show fallback data immediately
    if (loading || !githubProjects) return fallbackProjects;

    // Map through fallback projects and "enrich" them with live GitHub stats
    return fallbackProjects.map((staticProject) => {
      const githubRepo = githubProjects.find(
        (repo) => repo.htmlUrl?.toLowerCase() === staticProject.githubUrl?.toLowerCase()
      );

      if (!githubRepo) return staticProject;

      return {
        ...staticProject,
        title: staticProject.title || githubRepo.name.replace(/-/g, " "),
        description: staticProject.description || githubRepo.description,
        stars: githubRepo.stars,
        forks: githubRepo.forks,
        isGithub: true,
      };
    });
  }, [githubProjects, loading]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return allProjects;
    if (activeFilter === "Featured") return allProjects.filter((p) => p.featured);
    if (activeFilter === "Open Source") return allProjects.filter((p) => p.isGithub);
    return allProjects;
  }, [allProjects, activeFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Real-time "Currently Working On" Card */}
        <div className="mb-10">
          <CurrentProject current={latestRepo} loading={loading} />
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
            {loading ? "Fetching Projects..." : "What I've built"}
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

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-center gap-3 mb-12 overflow-x-auto pb-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium font-sans transition-all duration-300 border ${
                activeFilter === f
                  ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-gray-400 dark:hover:border-slate-500 hover:text-gray-900 dark:hover:text-slate-200 bg-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
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
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filtered.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No projects found for this category.
            </div>
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
