import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiFirebase,
  SiGit, SiTailwindcss, SiHtml5, SiCss3, SiExpress,
  SiMysql, SiPython, SiC, SiGithub, SiPostman,
  SiDocker, SiPostgresql, SiTypescript, SiSocketdotio, SiWebrtc
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

/* ─── Marquee skill items ─────────────────────────────────────────────────── */
const marqueeItems = [
  { label: 'React',       Icon: SiReact,       color: '#61DAFB' },
  { label: 'JavaScript',  Icon: SiJavascript,  color: '#F7DF1E' },
  { label: 'TypeScript',  Icon: SiTypescript,  color: '#3178C6' },
  { label: 'Node.js',     Icon: SiNodedotjs,   color: '#68A063' },
  { label: 'Express',     Icon: SiExpress,     color: '#e5e2e1' },

  { label: 'MongoDB',     Icon: SiMongodb,     color: '#4DB33D' },
  { label: 'MySQL',       Icon: SiMysql,       color: '#4479A1' },
  { label: 'PostgreSQL',  Icon: SiPostgresql,  color: '#336791' },

  { label: 'Socket.io',   Icon: SiSocketdotio, color: '#010101' },
  { label: 'WebRTC',      Icon: SiWebrtc,      color: '#333333' },

  { label: 'Docker',      Icon: SiDocker,      color: '#2496ED' },

  { label: 'Firebase',    Icon: SiFirebase,    color: '#FFCA28' },
  { label: 'Git',         Icon: SiGit,         color: '#F05032' },
  { label: 'GitHub',      Icon: SiGithub,      color: '#e5e2e1' },
  { label: 'Postman',     Icon: SiPostman,     color: '#FF6C37' },

  { label: 'Tailwind',    Icon: SiTailwindcss, color: '#38BDF8' },
  { label: 'HTML5',       Icon: SiHtml5,       color: '#E34F26' },
  { label: 'CSS3',        Icon: SiCss3,        color: '#2965F1' },

  { label: 'Python',      Icon: SiPython,      color: '#3776AB' },
  { label: 'Java',        Icon: FaJava,        color: '#F89820' },
  { label: 'C',           Icon: SiC,           color: '#A8B9CC' },
];

/* ─── Duplicate for seamless infinite scroll ──────────────────────────────── */
const doubledItems = [...marqueeItems, ...marqueeItems];

/* ─── Contextual cards ────────────────────────────────────────────────────── */
const contextCards = [
  {
    title: 'Scalable Architecture',
    body:  'Building performant applications with a modular approach that ensures long-term maintainability and high-speed execution.',
    gradient: 'from-primary/20 to-secondary/10',
    border:   'border-primary/20',
    dot:      'bg-primary',
  },
  {
    title: 'Atomic UI Systems',
    body:  'Leveraging modern CSS frameworks to create design systems that are both visually consistent and technically robust.',
    gradient: 'from-secondary/20 to-accent/10',
    border:   'border-secondary/20',
    dot:      'bg-secondary',
  },
  {
    title: 'Data Integrity',
    body:  'Implementing secure, real-time data flows across distributed systems with a focus on consistency and speed.',
    gradient: 'from-accent/20 to-primary/10',
    border:   'border-accent/20',
    dot:      'bg-accent',
  },
];

/* ─── Component ───────────────────────────────────────────────────────────── */
const TechStack = () => {
  const marqueeRef = useRef(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section className="px-6 sm:px-12 pt-24 pb-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans uppercase tracking-[0.2em] text-[0.7rem] text-primary dark:text-primary-light mb-4 block"
            >
              Engineered Ecosystem
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[1.08] font-extrabold tracking-tighter mb-8 text-gray-900 dark:text-white"
            >
              The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">
                Stack
              </span>
              <br />
              Behind the Craft.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-lg max-w-xl leading-relaxed"
            >
              A curated collection of tools, languages, and frameworks I use to
              craft fast, scalable, and beautiful web experiences.
            </motion.p>
          </div>

          <div className="hidden md:flex col-span-4 items-end justify-end pb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-48 h-48"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/30 via-secondary/10 to-transparent blur-2xl" />
              <div className="absolute inset-8 rounded-full border border-primary/20 animate-spin-slow" style={{ animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-16 rounded-full border border-secondary/20 animate-spin-slow" style={{ animation: 'spin 12s linear infinite reverse' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary">&lt;/&gt;</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Scrolling Marquee ───────────────────────────────────────────────── */}
      <section className="relative py-16 bg-gray-50/80 dark:bg-slate-800/50 transition-colors duration-300">

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-gray-50 dark:from-slate-800 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-gray-50 dark:from-slate-800 to-transparent z-10 pointer-events-none" />

        <p className="text-center font-sans uppercase tracking-[0.2em] text-[0.65rem] text-gray-400 dark:text-gray-500 mb-10">
          Technologies I work with
        </p>

        <div ref={marqueeRef} className="flex overflow-hidden select-none group">
          <div className="flex items-center gap-10 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
            {doubledItems.map((item, i) => (
              <SkillPill key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

/* ─── Skill Pill ──────────────────────────────────────────────────────────── */

const SkillPill = ({ item }) => {
  const { label, Icon, color } = item;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2 px-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center border transition-all duration-300
          bg-white dark:bg-slate-900
          ${hovered
            ? 'border-transparent shadow-[0_0_24px_rgba(59,130,246,0.15)]'
            : 'border-gray-200/60 dark:border-slate-700/50'
          }`}
      >
        <Icon
          size={36}
          style={{ color: hovered ? color : '#94a3b8', transition: 'color 0.3s' }}
        />
      </div>

      <span
        className="font-sans text-[0.65rem] uppercase tracking-widest"
        style={{ color: hovered ? '#3B82F6' : '#9ca3af' }}
      >
        {label}
      </span>
    </div>
  );
};

SkillPill.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

export default TechStack;