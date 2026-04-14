import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Connect from './pages/Connect';
import ThankYou from './pages/ThankYou';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showThankYou, setShowThankYou] = useState(false);

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

    const sectionIds = ['home', 'about', 'stack', 'projects', 'experience', 'connect'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle Smooth Navigation Click
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (showThankYou) {
    return (
      <ThemeProvider>
        <ThankYou onBack={() => { setShowThankYou(false); window.scrollTo(0, 0); }} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Sections */}
        <div id="home">
          <Home />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="stack">
          <TechStack />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="connect">
          <Connect onSuccess={() => setShowThankYou(true)} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;