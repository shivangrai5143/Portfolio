"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command, Search, Home, User, Layers, FolderOpen,
  BarChart2, Briefcase, Mail, Moon, Sun, X, ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  category: "Navigation" | "Actions";
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: "smooth" });
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();

  const commands = useMemo<CommandItem[]>(() => [
    { id: "home", label: "Go to Home", icon: Home, action: () => { scrollToSection("home"); onClose(); }, category: "Navigation" },
    { id: "about", label: "Go to About", icon: User, action: () => { scrollToSection("about"); onClose(); }, category: "Navigation" },
    { id: "stack", label: "Go to Tech Stack", icon: Layers, action: () => { scrollToSection("stack"); onClose(); }, category: "Navigation" },
    { id: "projects", label: "Go to Projects", description: "View all my projects", icon: FolderOpen, action: () => { scrollToSection("projects"); onClose(); }, category: "Navigation" },
    { id: "stats", label: "Go to Stats", icon: BarChart2, action: () => { scrollToSection("stats"); onClose(); }, category: "Navigation" },
    { id: "experience", label: "Go to Experience", icon: Briefcase, action: () => { scrollToSection("experience"); onClose(); }, category: "Navigation" },
    { id: "connect", label: "Go to Connect", description: "Contact me", icon: Mail, action: () => { scrollToSection("connect"); onClose(); }, category: "Navigation" },
    {
      id: "theme",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? Sun : Moon,
      action: () => { setTheme(theme === "dark" ? "light" : "dark"); onClose(); },
      category: "Actions",
    },
  ], [theme, setTheme, onClose]);

  const flatFiltered = useMemo(() => {
    return commands.filter(
      (c) =>
        query === "" ||
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase())
    );
  }, [commands, query]);

  const grouped = useMemo(() => ({
    Navigation: flatFiltered.filter((c) => c.category === "Navigation"),
    Actions: flatFiltered.filter((c) => c.category === "Actions"),
  }), [flatFiltered]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, flatFiltered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter") { flatFiltered[selected]?.action(); }
    },
    [open, flatFiltered, selected, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset selected when query changes
  useEffect(() => setSelected(0), [query]);

  let globalIdx = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 dark:border-slate-800">
              <Search size={16} className="text-gray-400 dark:text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or jump to..."
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300">
                  <X size={14} />
                </button>
              )}
              <kbd className="hidden sm:block px-2 py-0.5 rounded-md border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-500 text-[10px] font-mono">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {flatFiltered.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400 dark:text-slate-500">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                (["Navigation", "Actions"] as const).map((cat) => {
                  const items = grouped[cat];
                  if (items.length === 0) return null;
                  return (
                    <div key={cat}>
                      <p className="px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-slate-500">
                        {cat}
                      </p>
                      {items.map((item) => {
                        const idx = globalIdx++;
                        const isSelected = idx === selected;
                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setSelected(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              isSelected
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                : "text-gray-700 dark:text-slate-300"
                            }`}
                          >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? "bg-blue-500/15" : "bg-gray-100 dark:bg-slate-800"}`}>
                              <item.icon size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{item.label}</p>
                              {item.description && <p className="text-xs text-gray-400 dark:text-slate-500 truncate">{item.description}</p>}
                            </div>
                            {isSelected && <ArrowRight size={14} className="text-blue-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-gray-100 dark:border-slate-800 flex items-center gap-4 text-[10px] text-gray-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5"><Command size={11} /> K to open</span>
              <span className="flex items-center gap-1">↑↓ navigate</span>
              <span className="flex items-center gap-1">↵ select</span>
              <span className="ml-auto flex items-center gap-1.5"><Command size={11} /> by Shivang Rai</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
