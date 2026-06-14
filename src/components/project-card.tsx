"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/types";
import { getTechDetails } from "@/utils/github-utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const {
    title,
    description,
    image,
    techStack,
    githubUrl,
    liveUrl,
    featured,
    stars,
    forks,
  } = project;

  // Use a deterministic gradient based on title if image is missing
  const getPlaceholderGradient = (str: string): string => {
    const hash = str
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${h1}, 70%, 45%), hsl(${h2}, 80%, 35%))`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-600 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10"
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold font-sans">
          <FaStar size={10} />
          Featured
        </div>
      )}

      {/* GitHub Stats badges */}
      {((stars ?? 0) > 0 || (forks ?? 0) > 0) && (
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {(stars ?? 0) > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
              <FaStar size={10} className="text-yellow-400" />
              {stars}
            </div>
          )}
        </div>
      )}

      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-gray-200 dark:bg-slate-800 flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-bold text-2xl p-6 text-center"
            style={{ background: getPlaceholderGradient(title) }}
          >
            {title}
          </div>
        )}

        {/* Fallback for broken image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-violet-900/40 hidden items-center justify-center text-6xl">
          💻
        </div>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-slate-900/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
          {description ||
            "A project showcasing technical skills and problem-solving abilities."}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 5).map((tech) => {
            const details = getTechDetails(tech.name);
            const Icon = details.icon;
            return (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 text-xs font-medium hover:border-gray-300 dark:hover:border-slate-500 transition-colors"
              >
                <Icon className="text-sm" style={{ color: details.color }} />
                {tech.name}
              </span>
            );
          })}
          {techStack.length > 5 && (
            <span className="text-[10px] text-gray-500 self-center">
              +{techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2 border-t border-gray-200 dark:border-slate-800">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-500 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white text-sm font-semibold transition-all duration-200"
            >
              <FaGithub size={15} />
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <FaExternalLinkAlt size={12} />
              {liveUrl.includes("github.com") ? "Repo" : "Live Demo"}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
