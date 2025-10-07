import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import TechStack from './pages/TechStack';
import Projects from './pages/Projects';
import Connect from './pages/Connect';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
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
