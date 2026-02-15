import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';
import SectionTitle from '../components/ui/SectionTitle';

const Experience = () => {
    const experiences = [
        {
            id: 1,
            title: 'Web Development Intern',
            company: 'Prodigy Infotech',
            duration: 'December 2024 - January 2025',
            type: 'Remote',
            responsibilities: [
                'Developed responsive web applications using React.js and modern CSS frameworks',
                'Collaborated with the development team to implement new features and fix bugs',
                'Created reusable component libraries to improve development efficiency',
                'Participated in code reviews and followed best practices for clean code',
                'Gained hands-on experience with version control using Git and GitHub',
            ],
            technologies: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Git'],
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-800 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <SectionTitle
                    title="Experience"
                    subtitle="My professional journey and internship experience"
                />

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20"></div>

                    {/* Experience Cards */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform -translate-x-[9px] w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-slate-800 shadow-xl z-10 mt-6 md:mt-8"></div>

                                {/* Content Card */}
                                <div className="ml-8 md:ml-0 md:w-1/2">
                                    <div
                                        className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 group ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                                            }`}
                                    >
                                        <div className="flex flex-col gap-2 mb-4 border-b border-gray-100 dark:border-slate-700 pb-4">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                                    {exp.title}
                                                </h3>
                                                <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                                                    {exp.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                                                <FaBriefcase className="text-primary text-sm" />
                                                {exp.company}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <FaCalendar className="text-primary text-sm" />
                                                {exp.duration}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-6">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                    <span className="leading-relaxed">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
                                                <motion.span
                                                    key={tech}
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-colors cursor-default"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
