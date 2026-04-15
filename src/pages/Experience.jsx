import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar, FaGraduationCap } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      type: 'work',
      title: 'Web Development Intern',
      org: 'Prodigy Infotech',
      duration: 'July 2024 – August 2024',
      badge: 'Remote',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      points: [
        'Developed responsive web applications using React.js and Tailwind CSS',
        'Collaborated with the dev team to implement features and fix bugs',
        'Created reusable component libraries to improve development efficiency',
        'Participated in code reviews and followed clean-code best practices',
        'Used Git & GitHub for version control across all projects',
      ],
      tags: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Git'],
    },
  ];

  const education = [
    {
      id: 2,
      type: 'education',
      title: 'B.Tech in Computer Science & Engineering',
      org: 'Babu Banarasi Das University',
      duration: '2023 - 2027',
      badge: 'Pursuing',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      points: [
        'Core subjects: Data Structures, DBMS, OS, Computer Networks, OOP',
        'Built multiple full-stack projects as part of coursework and self-learning',
        'Relevant coursework: Web Development, Software Engineering, Algorithms',
      ],
      tags: ['Java', 'Python', 'C', 'Web Dev'],
    },
  ];

  const allEntries = [...experiences, ...education];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="min-h-screen bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            My journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-4">
            Experience &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A timeline of my professional milestones and academic background.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/40 via-violet-500/40 to-slate-800" />

          <div className="space-y-14">
            {allEntries.map((entry, index) => {
              const isWork = entry.type === 'work';
              const isRight = index % 2 === 0;

              return (
                <motion.div
                  key={entry.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Spacer half */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg ${
                      isWork
                        ? 'bg-emerald-500/20 border-emerald-500/60'
                        : 'bg-blue-500/20 border-blue-500/60'
                    }`}>
                      {isWork
                        ? <FaBriefcase className="text-emerald-400 text-sm" />
                        : <FaGraduationCap className="text-blue-400 text-sm" />
                      }
                    </div>
                  </div>

                  {/* Card */}
                  <div className="md:w-1/2">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className={`relative bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                        isRight ? 'md:ml-8' : 'md:mr-8'
                      }`}
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-heading">
                          {entry.title}
                        </h3>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ${entry.badgeColor}`}>
                          {entry.badge}
                        </span>
                      </div>

                      {/* Org */}
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-1">
                        {isWork
                          ? <FaBriefcase className="text-emerald-400 flex-shrink-0" size={12} />
                          : <FaGraduationCap className="text-blue-400 flex-shrink-0" size={13} />
                        }
                        {entry.org}
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-5">
                        <FaCalendar size={11} />
                        {entry.duration}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-slate-800 mb-4" />

                      {/* Points */}
                      <ul className="space-y-2.5 mb-5">
                        {entry.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isWork ? 'bg-emerald-400' : 'bg-blue-400'
                            }`} />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-medium rounded-full transition-colors cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
