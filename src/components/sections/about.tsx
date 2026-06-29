"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitHubCalendarComponent } from "@/components/github-calendar";
import { getCollection } from "@/lib/firestore";
import { aboutFallback } from "@/data/about";
import type { AboutData } from "@/types";

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>(aboutFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docs = await getCollection<AboutData & { id: string }>("about");
        if (docs.length > 0) {
          const { id: _id, ...data } = docs[0];
          setAboutData(data as AboutData);
        }
      } catch (err) {
        console.warn("Could not fetch About data from Firestore, using fallback.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
          <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gray-900 dark:text-white tracking-tight mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
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
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
          >
            <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-4">
              My Story
            </h3>
            {loading ? (
              <div className="space-y-3">
                {[90, 100, 75].map((w, i) => (
                  <div key={i} className={`h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse`} style={{ width: `${w}%` }} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-gray-600 dark:text-slate-400 leading-relaxed">
                {aboutData.bio.map((paragraph, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* What I Bring */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
            >
              <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                What I Bring
              </h3>
              {loading ? (
                <div className="space-y-3">
                  {[80, 90, 70, 85, 75, 65].map((w, i) => (
                    <div key={i} className="h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {aboutData.whatIBring.map((skill, index) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-600 dark:text-slate-400"
                    >
                      <span className="text-blue-400 text-xl mt-0.5">✓</span>
                      <span>{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* What I'm Looking For */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl shadow-lg p-8 border border-blue-500/20 hover:border-blue-400/40 transition-colors"
            >
              <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-4">
                {aboutData.lookingFor.title}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                {aboutData.lookingFor.description}
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-slate-400">
                {aboutData.lookingFor.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* GitHub Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white mb-2">
              GitHub Contributions
            </h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm">
              My code commits and activity over the last year
            </p>
          </div>
          <GitHubCalendarComponent username="shivangrai5143" />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
