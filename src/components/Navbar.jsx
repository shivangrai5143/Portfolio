import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ThemeToggle from './ui/ThemeToggle';

const Navbar = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'connect', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Portfolio
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 h-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center text-sm font-medium transition-colors duration-300 h-full px-1 ${activeSection === item.id
                    ? 'text-primary dark:text-primary-light'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
                  }`}
              >
                {item.label}
                {/* Underline Element */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary dark:bg-primary-light transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0'
                    }`}
                />
              </button>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium border-l-4 transition-all ${activeSection === item.id
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light border-primary dark:border-primary-light'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 border-transparent'
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

Navbar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Navbar;
