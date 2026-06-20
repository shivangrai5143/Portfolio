"use client";

import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GitHubCalendarProps {
  username: string;
}

export function GitHubCalendarComponent({ username }: GitHubCalendarProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[150px] animate-pulse bg-slate-800/50 rounded-2xl" />
    );
  }

  // GitHub theme configuration for light and dark modes
  const explicitTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#1e293b", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-3xl bg-white/5 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center w-full"
    >
      <div className="w-full overflow-x-auto pb-4 flex justify-center">
        <GitHubCalendar
          username={username}
          colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
          theme={explicitTheme}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </motion.div>
  );
}
