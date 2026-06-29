'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/navbar';
import LoadingScreen from '@/components/loading-screen';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import TechStack from '@/components/sections/tech-stack';
import Projects from '@/components/sections/projects';
import Stats from '@/components/sections/stats';
import Experience from '@/components/sections/experience';
import Achievements from '@/components/sections/achievements';
import Connect from '@/components/sections/connect';
import Footer from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';
import { ReadingProgress } from '@/components/reading-progress';
import { CommandPalette } from '@/components/command-palette';
import { useGitHubStats } from '@/hooks/use-github-stats';

const SECTION_IDS = [
  'home', 'about', 'stack', 'projects', 'stats',
  'experience', 'achievements', 'connect',
] as const;

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [loading, setLoading] = useState<boolean>(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  const {
    current,
    stats,
    loading: githubLoading,
    error: githubError,
  } = useGitHubStats();

  // ── Ctrl+K / Cmd+K ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── IntersectionObserver ────────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loading]);

  // ── Smooth scroll ───────────────────────────────────────────────────────────
  const scrollToSection = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <ReadingProgress />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div
        className={`min-h-screen bg-gray-50 dark:bg-slate-950 transition-opacity duration-500 ${
          loading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Navbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onCommandPaletteOpen={() => setCmdOpen(true)}
        />

        <div id="home"><Hero current={current} loading={githubLoading} /></div>
        <div id="about"><About /></div>
        <div id="stack"><TechStack /></div>
        <div id="projects">
          <Projects githubData={{ current, loading: githubLoading, error: githubError }} />
        </div>
        <div id="stats"><Stats githubData={{ stats, loading: githubLoading }} /></div>
        <div id="experience"><Experience /></div>
        <div id="achievements"><Achievements /></div>
        <div id="connect"><Connect /></div>

        <Footer />
      </div>

      <BackToTop />
    </>
  );
}
