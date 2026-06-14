"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaCode, FaLayerGroup, FaGithub, FaBriefcase } from "react-icons/fa";
import type { GitHubStats } from "@/types";

// ── Animated counter hook ──────────────────────────────────────────────────
const useCounter = (target: number, duration = 1800, shouldStart = false): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart || target === 0) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);

  return count;
};

// ── Skeleton Stat ──────────────────────────────────────────────────────────
const SkeletonStat = () => (
  <div className="flex flex-col items-center gap-4 w-full">
    <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-slate-700 animate-pulse" />
    <div className="w-20 h-8 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
    <div className="w-28 h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
  </div>
);

// ── Stat card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  shouldStart: boolean;
  isLoading: boolean;
}

const StatCard = ({
  icon: Icon,
  color,
  bgColor,
  value,
  suffix,
  label,
  delay,
  shouldStart,
  isLoading,
}: StatCardProps) => {
  const count = useCounter(value, 1800, shouldStart && !isLoading);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col items-center p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm"
      >
        <SkeletonStat />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative group flex flex-col items-center p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 overflow-hidden"
    >
      {/* Glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${bgColor} blur-2xl`} />

      {/* Icon */}
      <div className={`relative z-10 w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center mb-5 shadow-lg`}>
        <Icon className={`text-2xl ${color}`} />
      </div>

      {/* Counter */}
      <div className="relative z-10 flex items-end gap-1 mb-2">
        <span className="text-5xl font-extrabold font-heading text-gray-900 dark:text-white tabular-nums">
          {count}
        </span>
        <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 pb-1">{suffix}</span>
      </div>

      {/* Label */}
      <p className="relative z-10 text-gray-600 dark:text-slate-400 text-sm font-sans text-center leading-snug">
        {label}
      </p>
    </motion.div>
  );
};

// ── Props ──────────────────────────────────────────────────────────────────
interface StatsProps {
  githubData: {
    stats: GitHubStats | null;
    loading: boolean;
  };
}

// ── Main component ─────────────────────────────────────────────────────────
const Stats = ({ githubData }: StatsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { stats: githubStats, loading } = githubData;

  const stats = [
    {
      icon: FaCode,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      value: githubStats?.totalRepos ?? 10,
      suffix: "+",
      label: "GitHub Repositories",
      delay: 0,
    },
    {
      icon: FaLayerGroup,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      value: githubStats?.techStack?.length ?? 20,
      suffix: "+",
      label: "Technologies Known",
      delay: 0.1,
    },
    {
      icon: FaGithub,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      value: 10,
      suffix: "+",
      label: "Projects Completed",
      delay: 0.2,
    },
    {
      icon: FaBriefcase,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      value: 2,
      suffix: "+",
      label: "Years of Coding",
      delay: 0.3,
    },
  ];

  return (
    <div className="relative bg-gray-50 dark:bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/[0.08] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/[0.08] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            By the numbers
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight">
            A Snapshot of My{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          {/* Live data indicator */}
          {!loading && githubStats && (
            <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-3 font-sans flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Live data from GitHub
            </p>
          )}
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
              shouldStart={isInView}
              isLoading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
