import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileDownload, FaChevronDown, FaGithub } from 'react-icons/fa';
import SocialLinks from '../components/ui/SocialLinks';
import Button from '../components/ui/Button';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { getTechDetails } from '../utils/githubUtils';

// ── Typing animation hook ──────────────────────────────────────────────────
const ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'React Developer',
  'Node.js Developer',
  'Open Source Enthusiast',
];

const useTypingAnimation = (words, { typingSpeed = 80, deletingSpeed = 40, pauseMs = 1600 } = {}) => {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting) {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseMs);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
};

// ── Component ──────────────────────────────────────────────────────────────
const Home = () => {
  const typedRole = useTypingAnimation(ROLES);
  const { current: latestRepo, loading } = useGitHubStats();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      {/* ── Animated mesh gradient orbs ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="mesh-orb-1 absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-[120px]" />
        <div className="mesh-orb-2 absolute top-1/2 -right-48 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[130px]" />
        <div className="mesh-orb-3 absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px]" />
        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 pt-32">

        {/* Dynamic Activity Badge */}
        <AnimatePresence>
          {!loading && latestRepo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <a
                href={latestRepo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm"
              >
                <div className="flex -space-x-2">
                   {latestRepo.topics?.slice(0, 2).map((t, i) => {
                     const { icon: Icon, color } = getTechDetails(t);
                     return (
                       <div key={t} className={`p-1.5 rounded-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm z-[${20-i}]`}>
                          <Icon className={`text-xs ${color}`} />
                       </div>
                     );
                   })}
                   <div className="p-1.5 rounded-full bg-blue-500 text-white border border-blue-400 shadow-sm z-0">
                      <FaGithub className="text-xs" />
                   </div>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-blue-500 dark:text-blue-400 font-bold leading-none mb-0.5">
                    Working on
                  </p>
                  <p className="text-xs font-semibold text-gray-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {latestRepo.name.replace(/-/g, ' ')}
                  </p>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Availability badge fallback if no activity or loading */}
        {(loading || !latestRepo) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-sans font-medium tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>
        )}

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Rotating gradient ring */}
            <div className="ring-spin absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400 opacity-80" />
            {/* White gap ring */}
            <div className="absolute -inset-0.5 rounded-full bg-white dark:bg-slate-950" />
            {/* Image */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-2xl">
              <img
                src="/assets/copy.jpeg"
                alt="Shivang Rai"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading text-gray-900 dark:text-white mb-4 tracking-tight"
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            Shivang Rai
          </span>
        </motion.h1>

        {/* Typing animation row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-semibold text-gray-600 dark:text-slate-300 mb-6 h-10"
        >
          <span>{typedRole}</span>
          <span className="cursor-blink text-blue-400 font-light select-none">|</span>
        </motion.div>

        {/* Short bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-gray-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Building scalable, interactive web applications with modern technologies.
          Passionate about clean code, great UX, and shipping products that matter.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mb-10"
        >
          <SocialLinks iconSize={28} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="primary"
            size="lg"
            icon={FaFileDownload}
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Resume.pdf"
          >
            Download Resume
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={FaChevronDown}
            onClick={() => scrollTo('projects')}
          >
            View Projects
          </Button>

          {/* Contact Me — ghost button */}
          <button
            onClick={() => scrollTo('connect')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:border-blue-400 font-semibold text-base transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-400/5"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Scroll down arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex justify-center"
          >
            <FaChevronDown className="text-gray-400 dark:text-slate-600 text-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
