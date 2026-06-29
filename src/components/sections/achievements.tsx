"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import { getCollection } from "@/lib/firestore";
import { achievementsFallback } from "@/data/achievements";
import type { Achievement } from "@/types";

const categoryConfig: Record<Achievement["category"], { color: string; bg: string }> = {
  Hackathon: { color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30" },
  Award: { color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30" },
  "Open Source": { color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30" },
  Academic: { color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30" },
  Community: { color: "text-pink-400", bg: "bg-pink-500/15 border-pink-500/30" },
  Other: { color: "text-slate-400", bg: "bg-slate-500/15 border-slate-500/30" },
};

const AchievementCard = ({ item, index }: { item: Achievement; index: number }) => {
  const config = categoryConfig[item.category];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative flex gap-5 group"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-11 h-11 rounded-xl border ${config.bg} flex items-center justify-center text-xl z-10 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
          {item.icon || "🏆"}
        </div>
        {/* Vertical line */}
        <div className="w-px flex-1 bg-gray-200 dark:bg-slate-800 mt-2 min-h-[24px]" />
      </div>

      {/* Content card */}
      <div className="flex-1 pb-6">
        <div className="bg-white dark:bg-slate-800/70 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug">{item.title}</h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.bg} ${config.color}`}>
                {item.category}
              </span>
              {item.featured && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Featured
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
            {item.description}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-gray-400 dark:text-slate-500">
              {item.date ? new Date(item.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ""}
            </span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 hover:underline font-medium"
              >
                <ExternalLink size={11} /> View
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCollection<Achievement>("achievements");
        setItems(data.length > 0 ? data : achievementsFallback);
      } catch {
        setItems(achievementsFallback);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            Milestones
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight mb-4">
            Achievements &{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Awards
            </span>
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Key milestones and accomplishments on my developer journey
          </p>
        </motion.div>

        {/* Timeline */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-5">
                <div className="w-11 h-11 rounded-xl bg-gray-200 dark:bg-slate-800 animate-pulse shrink-0" />
                <div className="flex-1 rounded-2xl bg-gray-100 dark:bg-slate-800/70 p-5 space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-slate-600">
            <Trophy size={40} className="mx-auto mb-4 opacity-40" />
            <p>No achievements to display yet.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {items.map((item, index) => (
              <AchievementCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
