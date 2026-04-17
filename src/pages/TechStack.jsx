import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiFirebase,
  SiGit, SiTailwindcss, SiHtml5, SiCss3, SiExpress,
  SiMysql, SiPython, SiC, SiGithub, SiPostman,
  SiDocker, SiPostgresql, SiTypescript, SiSocketdotio, SiWebrtc, SiDjango
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// ── Skill data by category ──────────────────────────────────────────────────
const categories = {
  All: null,
  Frontend: [
    { label: 'React', Icon: SiReact, color: '#61DAFB' },
    { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
    { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { label: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
    { label: 'CSS3', Icon: SiCss3, color: '#2965F1' },
    { label: 'Tailwind', Icon: SiTailwindcss, color: '#38BDF8' },
  ],
  Backend: [
    { label: 'Node.js', Icon: SiNodedotjs, color: '#68A063' },
    { label: 'Express', Icon: SiExpress, color: '#c0bebe' },
    { label: 'MongoDB', Icon: SiMongodb, color: '#4DB33D' },
    { label: 'MySQL', Icon: SiMysql, color: '#4479A1' },
    { label: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
    { label: 'Socket.io', Icon: SiSocketdotio, color: '#8e8e8e' },
    { label: 'WebRTC', Icon: SiWebrtc, color: '#EC5F59' },
    { label: 'Firebase', Icon: SiFirebase, color: '#FFCA28' },
    { label: 'Python', Icon: SiPython, color: '#3776AB' },
    { label: 'Java', Icon: FaJava, color: '#F89820' },
    { label: 'C', Icon: SiC, color: '#A8B9CC' },
    { label: 'Django', Icon: SiDjango, color: '#092E20' },
  ],
  'Tools & DevOps': [
    { label: 'Git', Icon: SiGit, color: '#F05032' },
    { label: 'GitHub', Icon: SiGithub, color: '#c0bebe' },
    { label: 'Docker', Icon: SiDocker, color: '#2496ED' },
    { label: 'Postman', Icon: SiPostman, color: '#FF6C37' },
  ],
};

const allSkills = [
  ...categories.Frontend,
  ...categories.Backend,
  ...categories['Tools & DevOps'],
];

// For the marquee strip (duplicate for infinite loop)
const marqueeItems = [...allSkills, ...allSkills];

// ── Skill Pill ──────────────────────────────────────────────────────────────
const SkillPill = ({ item, index }) => {
  const { label, Icon, color } = item;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2 p-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border transition-all duration-300
          bg-white dark:bg-slate-900
          ${hovered
            ? 'border-transparent shadow-[0_0_28px_rgba(59,130,246,0.2)]'
            : 'border-gray-200 dark:border-slate-700/50'
          }`}
        style={hovered ? { boxShadow: `0 0 28px ${color}30` } : {}}
      >
        <Icon size={32} style={{ color: hovered ? color : '#64748b', transition: 'color 0.3s' }} />
      </div>
      <span
        className="font-sans text-[0.6rem] uppercase tracking-widest transition-colors duration-300"
        style={{ color: hovered ? color : '#64748b' }}
      >
        {label}
      </span>
    </motion.div>
  );
};

SkillPill.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// ── Marquee pill (no animation stagger — just hover) ───────────────────────
const MarqueePill = ({ item }) => {
  const { label, Icon, color } = item;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3 px-2 transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center border transition-all duration-300
          bg-white dark:bg-slate-900
          ${hovered ? 'border-transparent' : 'border-gray-200 dark:border-slate-700/50'}`}
      >
        <Icon size={36} style={{ color: hovered ? color : '#64748b', transition: 'color 0.3s' }} />
      </div>
      <span
        className="font-sans text-[0.65rem] uppercase tracking-widest"
        style={{ color: hovered ? color : '#94a3b8' }}
      >
        {label}
      </span>
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
const TechStack = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = Object.keys(categories);

  const visibleSkills = activeTab === 'All' ? allSkills : categories[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            Engineered Ecosystem
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight mb-4">
            The{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Stack
            </span>{' '}
            Behind the Craft
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            A curated collection of tools, languages, and frameworks I use to
            craft fast, scalable, and beautiful web experiences.
          </p>
        </motion.div>

        {/* ── Category tabs ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium font-sans transition-all duration-300 border ${activeTab === tab
                ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-gray-400 dark:hover:border-slate-500 hover:text-gray-900 dark:hover:text-slate-200 bg-transparent'
                }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* ── Skills grid ─────────────────────────────────────────────────── */}
        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 justify-items-center"
            >
              {visibleSkills.map((item, i) => (
                <SkillPill key={item.label} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Marquee strip ───────────────────────────────────────────────── */}
        <div className="relative mt-20 py-12 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50/80 dark:from-slate-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50/80 dark:from-slate-900/80 to-transparent z-10 pointer-events-none" />

          <p className="text-center font-sans uppercase tracking-[0.2em] text-[0.65rem] text-gray-500 dark:text-slate-500 mb-10">
            Technologies I work with
          </p>

          <div className="flex overflow-hidden select-none group">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
              {marqueeItems.map((item, i) => (
                <MarqueePill key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;