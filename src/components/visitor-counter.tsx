"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, TrendingUp } from "lucide-react";
import { getDocument, setDocument } from "@/lib/firestore";

interface VisitorData {
  total: number;
  today: number;
  lastVisit: string;
}

/**
 * VisitorCounter — admin-only widget.
 * Increments a Firestore counter on mount and displays the running total.
 * Not shown to public visitors.
 */
export function VisitorCounter() {
  const [data, setData] = useState<VisitorData | null>(null);

  useEffect(() => {
    const track = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const existing = await getDocument<VisitorData>("analytics", "visitors");

        const updated: VisitorData = {
          total: (existing?.total ?? 0) + 1,
          today: existing?.lastVisit?.startsWith(today)
            ? (existing?.today ?? 0) + 1
            : 1,
          lastVisit: new Date().toISOString(),
        };

        await setDocument("analytics", "visitors", updated);
        setData(updated);
      } catch (e) {
        console.warn("Visitor counter unavailable", e);
      }
    };
    track();
  }, []);

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3"
      >
        <div className="w-9 h-9 bg-blue-500/15 rounded-lg flex items-center justify-center shrink-0">
          <Eye size={16} className="text-blue-400" />
        </div>
        <div>
          <p className="text-slate-400 text-xs">Total Visits</p>
          <p className="text-white text-xl font-bold">{data.total.toLocaleString()}</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.07 }}
        className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3"
      >
        <div className="w-9 h-9 bg-emerald-500/15 rounded-lg flex items-center justify-center shrink-0">
          <TrendingUp size={16} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-slate-400 text-xs">Today</p>
          <p className="text-white text-xl font-bold">{data.today.toLocaleString()}</p>
        </div>
      </motion.div>
    </div>
  );
}
