import { motion } from 'framer-motion';
import { FaFileDownload, FaChevronDown } from 'react-icons/fa';
import SocialLinks from '../components/ui/SocialLinks';
import Button from '../components/ui/Button';

const Home = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
              <img
                src="/assets/copy.jpeg"
                alt="Shivang Rai"
                className="w-full h-full object-cover"
              />

            </div>
            {/* Gradient ring animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading text-gray-900 dark:text-white mb-4">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Shivang Rai
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            MERN Stack Developer
          </p>
        </motion.div>

        {/* Short Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Building scalable and interactive web applications with modern technologies.
          Passionate about creating elegant solutions to complex problems.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-10"
        >
          <SocialLinks iconSize={32} />
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
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Shivang_Rai_Resume.pdf"
          >
            Download Resume
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={FaChevronDown}
            onClick={scrollToProjects}
          >
            View Projects
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <FaChevronDown className="text-gray-400 dark:text-gray-600 text-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
