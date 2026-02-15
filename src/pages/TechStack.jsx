import { motion } from 'framer-motion';
import SectionTitle from '../components/ui/SectionTitle';
import SkillCard from '../components/ui/SkillCard';
import { skillsData } from '../constants/skills';

const TechStack = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Tech Stack"
          subtitle="Technologies and tools I work with to build modern web applications"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
            >
              {/* Category Header */}
              <div className="mb-6">
                <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${category.color} mb-4`}></div>
                <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    color={skill.color}
                    index={skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
