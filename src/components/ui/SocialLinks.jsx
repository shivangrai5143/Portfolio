import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const socialData = [
    {
        name: 'LinkedIn',
        icon: FaLinkedin,
        url: 'https://www.linkedin.com/in/shivang-rai-58b45728b/',
        color: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
        name: 'GitHub',
        icon: FaGithub,
        url: 'https://github.com/shivangrai5143',
        color: 'hover:text-gray-800 dark:hover:text-gray-300',
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        url: 'https://x.com/raishivang_69/',
        color: 'hover:text-sky-500 dark:hover:text-sky-400',
    },
];

const SocialLinks = ({ className = '', iconSize = 28 }) => {
    return (
        <div className={`flex justify-center gap-6 ${className}`}>
            {socialData.map((social, index) => {
                const Icon = social.icon;
                return (
                    <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.2, y: -3 }}
                        className={`text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                        aria-label={social.name}
                    >
                        <Icon size={iconSize} />
                    </motion.a>
                );
            })}
        </div>
    );
};

SocialLinks.propTypes = {
    className: PropTypes.string,
    iconSize: PropTypes.number,
};

export default SocialLinks;
