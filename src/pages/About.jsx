import { motion } from 'framer-motion';


const About = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-sans font-medium block mb-3">
            Know me better
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Get to know more about my journey as a developer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - My Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <h3 className="text-2xl font-bold font-heading text-white mb-4">
              My Story
            </h3>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I'm a passionate <span className="font-semibold text-primary">MERN Stack Developer</span> with a keen interest in building modern, scalable web applications. My journey in software development started with a curiosity for problem-solving and has evolved into a dedication to creating elegant, user-centered solutions.
              </p>
              <p>
                I specialize in the <span className="font-semibold">MERN stack</span> (MongoDB, Express.js, React, Node.js) and love working on full-stack projects where I can bring ideas to life from concept to deployment. My approach combines technical expertise with a strong focus on user experience and clean code practices.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, and continuously learning to stay at the forefront of web development.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills Summary & Goals */}
          <div className="space-y-8">
            {/* Skills Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <h3 className="text-2xl font-bold font-heading text-white mb-4">
                What I Bring
              </h3>
              <ul className="space-y-3">
                {[
                  'Full-stack web development with MERN stack',
                  'Responsive & mobile-first UI design',
                  'RESTful API development & integration',
                  'Real-time applications with Firebase',
                  'Cloud deployment & DevOps basics',
                  'Version control with Git & GitHub',
                ].map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 text-slate-400"
                  >
                    <span className="text-blue-400 text-xl mt-0.5">✓</span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* What I'm Looking For */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl shadow-lg p-8 border border-blue-500/20 hover:border-blue-400/40 transition-colors"
            >
              <h3 className="text-2xl font-bold font-heading text-white mb-4">
                What I&apos;m Looking For
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                I'm actively seeking opportunities as a{' '}
                <span className="font-bold text-primary">Software Developer</span> or{' '}
                <span className="font-bold text-primary">SDE Internship</span> where I can:
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Work on challenging real-world projects
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Collaborate with experienced developers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Contribute to impactful products
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  Continue learning and growing as a developer
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
