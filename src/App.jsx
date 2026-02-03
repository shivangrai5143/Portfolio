import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import Connect from './pages/Connect';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // 1. Handle Scroll Detection
  useEffect(() => {
    const observerOptions = {
      root: null, // use the browser viewport
      // This margin defines the 'sweet spot' where a section is considered active
      // It triggers when a section occupies the top 30% of the screen
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

    // Get all divs with the IDs we want to track
    const sectionIds = ['home', 'about', 'stack', 'projects', 'connect'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Handle Smooth Navigation Click
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 64; // Matches your h-16 (16 * 4px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen">
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
      <div id="connect">
        <Connect />
      </div>
    </div>
  );
}

export default App;