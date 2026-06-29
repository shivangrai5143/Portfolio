"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getIconByName } from "@/utils/github-utils";
import {
  skillCategories as staticCategories,
  allSkills as staticAll,
  skillTabs as staticTabs,
} from "@/constants/skills";
import type { Skill } from "@/types";

// ── Skill Pill ──────────────────────────────────────────────────────────────
interface SkillPillProps {
  item: Skill;
  index: number;
}

const SkillPill = ({ item, index }: SkillPillProps) => {
  const { label, iconName, color, proficiency = 80 } = item;
  const Icon = getIconByName(iconName);
  const [hovered, setHovered] = useState(false);

  // SVG progress ring configuration
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2 p-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border transition-all duration-300
          bg-white dark:bg-slate-900
          ${hovered
            ? "border-transparent shadow-[0_0_28px_rgba(59,130,246,0.15)]"
            : "border-gray-200 dark:border-slate-700/50"
          }`}
        style={hovered ? { boxShadow: `0 0 28px ${color}20` } : {}}
      >
        {/* Animated SVG circular progress ring */}
        {hovered && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={`${color}15`}
              strokeWidth="2.5"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          </svg>
        )}

        <Icon size={32} style={{ color: hovered ? color : "#64748b", transition: "color 0.3s" }} />

        {/* Floating percentage badge on hover */}
        {hovered && (
          <span className="absolute -top-2.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow border border-slate-800 dark:border-slate-200 scale-90">
            {proficiency}%
          </span>
        )}
      </div>
      <span
        className="font-sans text-[0.6rem] uppercase tracking-widest transition-colors duration-300 text-center"
        style={{ color: hovered ? color : "#64748b" }}
      >
        {label}
      </span>
    </motion.div>
  );
};

// ── Marquee pill ────────────────────────────────────────────────────────────
interface MarqueePillProps {
  item: Skill;
}

const MarqueePill = ({ item }: MarqueePillProps) => {
  const { label, iconName, color } = item;
  const Icon = getIconByName(iconName);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3 px-2 transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center border transition-all duration-300
          bg-white dark:bg-slate-900
          ${hovered ? "border-transparent" : "border-gray-200 dark:border-slate-700/50"}`}
      >
        <Icon size={36} style={{ color: hovered ? color : "#64748b", transition: "color 0.3s" }} />
      </div>
      <span
        className="font-sans text-[0.65rem] uppercase tracking-widest text-center"
        style={{ color: hovered ? color : "#94a3b8" }}
      >
        {label}
      </span>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const TechStack = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  // Always use static constants — no GitHub/Firestore dependency
  const categoryMap = staticCategories as Record<string, Skill[]>;
  const allSkillsList: Skill[] = staticAll;
  const tabNames: string[] = staticTabs as unknown as string[];

  const visibleSkills: Skill[] =
    activeTab === "All" ? allSkillsList : categoryMap[activeTab] || [];

  // Duplicate for infinite marquee loop
  const marqueeItems = [...allSkillsList, ...allSkillsList];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            Engineered Ecosystem
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Stack
            </span>{" "}
            Behind the Craft
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            A curated collection of tools, languages, and frameworks I use to
            craft fast, scalable, and beautiful web experiences.
          </p>
        </motion.div>

        {/* ── Category tabs ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabNames.map((tab) => (
            <button suppressHydrationWarning
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium font-sans transition-all duration-300 border ${
                activeTab === tab
                  ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-gray-400 dark:hover:border-slate-500 hover:text-gray-900 dark:hover:text-slate-200 bg-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* ── Skills grid ─────────────────────────────────────────────────── */}
        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 justify-items-center"
            >
              {visibleSkills.map((item, i) => (
                <SkillPill key={`${activeTab}-${item.label}-${i}`} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Marquee strip ───────────────────────────────────────────────── */}
        <div className="relative mt-20 py-12 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50/80 dark:from-slate-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50/80 dark:from-slate-900/80 to-transparent z-10 pointer-events-none" />

          <p className="text-center font-sans uppercase tracking-[0.2em] text-[0.65rem] text-gray-500 dark:text-slate-500 mb-10">
            Technologies I work with
          </p>

          <div className="flex overflow-hidden select-none group">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
              {marqueeItems.map((item, i) => (
                <MarqueePill key={`${item.label}-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechStack;
