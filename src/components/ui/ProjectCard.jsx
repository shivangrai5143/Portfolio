import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index = 0 }) => {
    const { title, description, image, techStack, githubUrl, liveUrl } = project;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 h-[400px] focus:outline-none"
            tabIndex={0}
        >
            {/* Project Image & Overlay Container */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                {/* Fallback if image fails or is missing */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 hidden items-center justify-center">
                    <span className="text-6xl">💻</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-3 font-heading translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">
                        {title}
                    </h3>
                    <p className="text-gray-200 mb-6 line-clamp-4 translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 delay-75">
                        {description}
                    </p>

                    <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 delay-100">
                        {liveUrl && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                            >
                                <FaExternalLinkAlt size={14} />
                                Live Demo
                            </a>
                        )}
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                            >
                                <FaGithub size={16} />
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Tech Stack Strip (Visible always) */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-3 border-t border-gray-100 dark:border-slate-700 transform translate-y-0 group-hover:translate-y-full group-focus-within:translate-y-full transition-transform duration-300">
                <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar">
                    {techStack.map((tech) => {
                        const Icon = tech.icon;
                        return (
                            <div key={tech.name} className="text-gray-600 dark:text-gray-300" title={tech.name}>
                                <Icon className="text-xl" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string,
        techStack: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                icon: PropTypes.elementType.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,
        githubUrl: PropTypes.string,
        liveUrl: PropTypes.string,
    }).isRequired,
    index: PropTypes.number,
};

export default ProjectCard;
