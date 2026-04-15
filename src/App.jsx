import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CurrentProject from './components/CurrentProject';
import Home from './pages/Home';
import About from './pages/About';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import Stats from './pages/Stats';
import Experience from './pages/Experience';
import Connect from './pages/Connect';
import ThankYou from './pages/ThankYou';
import { useGitHubStats } from './hooks/useGitHubStats';

function PortfolioApp({ onSuccess }) {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  // Fetch GitHub data once at the app level
  const { current, loading: githubLoading } = useGitHubStats();

  // Handle Scroll Detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sectionIds = ['home', 'about', 'stack', 'projects', 'stats', 'experience', 'connect'];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  // Handle Smooth Navigation Click
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

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
          <Home />
        </div>

        {/* ── Currently Working On banner (live from GitHub) ── */}
        <CurrentProject current={current} loading={githubLoading} />

        <div id="about">
          <About />
        </div>
        <div id="stack">
          <TechStack />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="stats">
          <Stats />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="connect">
          <Connect onSuccess={onSuccess} />
        </div>
      </div>
    </>
  );
}

function App() {
  const [showThankYou, setShowThankYou] = useState(false);

  if (showThankYou) {
    return (
      <ThemeProvider>
        <ThankYou onBack={() => { setShowThankYou(false); window.scrollTo(0, 0); }} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <PortfolioApp onSuccess={() => setShowThankYou(true)} />
    </ThemeProvider>
  );
}

export default App;