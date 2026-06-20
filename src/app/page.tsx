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
import Connect from '@/components/sections/connect';
import Footer from '@/components/footer';
import { useGitHubStats } from '@/hooks/use-github-stats';

const SECTION_IDS = ['home', 'about', 'stack', 'projects', 'stats', 'experience', 'connect'] as const;

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch GitHub data once at the page level
  const {
    current,
    stats,
    projects,
    skills,
    loading: githubLoading,
    error: githubError,
  } = useGitHubStats();

  // ── IntersectionObserver for active-section tracking ───────────────────────
  useEffect(() => {
    if (loading) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  // ── Smooth scroll navigation ──────────────────────────────────────────────
  const scrollToSection = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 64;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div
        className={`min-h-screen bg-gray-50 dark:bg-slate-950 transition-opacity duration-500 ${
          loading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        <div id="home">
          <Hero current={current} loading={githubLoading} />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="stack">
          <TechStack skills={skills} loading={githubLoading} />
        </div>

        <div id="projects">
          <Projects
            githubData={{
              current,
              loading: githubLoading,
              error: githubError,
            }}
          />
        </div>

        <div id="stats">
          <Stats githubData={{ stats, loading: githubLoading }} />
        </div>

        <div id="experience">
          <Experience />
        </div>

        <div id="connect">
          <Connect />
        </div>

        <Footer />
      </div>
    </>
  );
}
