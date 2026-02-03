import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiVite,
  SiPostman,
} from 'react-icons/si';

const TechStack = () => {
  const techCategories = [
    {
      title: 'Frontend :',
      skills: [
        { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
        { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
        { name: 'React', icon: <FaReact className="text-cyan-500" /> },
        { name: 'Redux', icon: <SiRedux className="text-purple-600" /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
      ],
    },
    {
      title: 'Backend :',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
        { name: 'Express', icon: <SiExpress className="text-gray-700" /> },
      ]
    },
    {
      title: 'Databases :',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-600" /> },
      ],
    },
    {
      title: 'Tools & Others :',
      skills: [
        { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
        { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
        { name: 'Vite', icon: <SiVite className="text-purple-500" /> },
        { name: 'Postman', icon: <SiPostman className="text-orange-600" /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-90 mb-4 text-center">
          Tech Stack
        </h1>
        <p className="text-lg text-blue-600 text-center mb-12">
          Technologies and tools I familiar with
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category) => (
            <div
              key={category.title}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-primary pb-2">
                {category.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="text-4xl">{skill.icon}</div>
                    <span className="font-medium text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
