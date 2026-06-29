"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable <= 0) return;
      setProgress((scrollTop / totalScrollable) * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
}
