"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Command } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { NAV_LINKS } from "@/constants/site-config";
import { useRouter } from "next/navigation";

interface NavbarProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
  onCommandPaletteOpen?: () => void;
}

const Navbar = ({ activeSection, onNavigate, onCommandPaletteOpen }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      router.push(`/#${id}`);
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-slate-800/50 fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button suppressHydrationWarning
            onClick={() => handleNavClick("home")}
            className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent"
          >
            Portfolio
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 h-full">
            {NAV_LINKS.map((item) => (
              <button suppressHydrationWarning
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center text-sm font-medium transition-colors duration-300 h-full px-1 ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.label}
                {/* Underline Element */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Command Palette trigger */}
            <button
              suppressHydrationWarning
              onClick={onCommandPaletteOpen}
              title="Open command palette (Ctrl+K)"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all text-xs"
            >
              <Command size={12} />
              <span>K</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button suppressHydrationWarning
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((item) => (
              <button suppressHydrationWarning
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium border-l-4 transition-all ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 border-transparent"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
