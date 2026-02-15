import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FaSun className="text-xl text-yellow-400" />
            ) : (
                <FaMoon className="text-xl text-slate-700" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
