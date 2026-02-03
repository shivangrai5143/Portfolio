import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiRedux,
  SiVercel,
  SiCloudinary,
  SiRender,
  SiAxios,
  SiJsonwebtokens,
  SiPostman,
  SiOpenai,
  SiFirebase,
} from "react-icons/si";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Weather App",
      description:
        "A responsive weather dashboard that provides real-time weather data, forecasts, and interactive maps.",
      techStack: [
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
      ],
      githubUrl: "https://github.com/shivangrai5143/Weather-App",
      liveUrl: "https://thunder-weather-app.vercel.app/",
    },
    {
      id: 2,
      title: "URL Shortener",
      description:
        "A simple URL Shortener built with Node.js, Express, and MongoDB. It shortens long URLs and can be tested with Postman.",
      techStack: [
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "Express", icon: <SiExpress className="text-gray-700" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
        { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      ],
      githubUrl: "https://github.com/shivangrai5143/URL-Shortner",
    },
    {
      id: 3,
      title: "Amazon Clone",
      description:
        "A frontend-only Amazon clone created with HTML, CSS, and JavaScript. It replicates Amazon's homepage and product listings with a responsive UI.",
      techStack: [
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
      ],
      githubUrl: "https://github.com/shivangrai5143/Amazon-clone",
      liveUrl: "https://shivangrai5143.github.io/Amazon-clone/"
    },
    {
      id: 4,
      title: "Chat-App",
      description:
        "💬 Real-Time Chat App (2025) — A full-stack real-time chat app built with React.js and Firebase Auth for instant, secure communication.",
      techStack: [
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
        { name: "Firebase", icon: <SiFirebase className="text-red-500" /> },
        { name: "Cloudinary", icon: <SiCloudinary className="text-blue-500" /> },
        {name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourprofile/project",
    },
    {
      id: 5,
      title: "Coffee Shop Application",
      description:
        "A mobile-friendly platform to browse coffee products, customize orders, and make secure payments easily.",
      techStack: [
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
        { name: "Express", icon: <SiExpress className="text-gray-700" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
        { name: "Generative AI", icon: <SiOpenai className="text-green-500" /> },
        { name: "Vercel", icon: <SiVercel className="text-black" /> },
      ],
      githubUrl: "https://github.com/VivekYadav-77/Coffee-Shop-Web-App",
      liveUrl: "https://the-roasting-house.vercel.app/",
    },
    {
      id: 6,
      title: "Project Management App",
      description:
        "A full-stack project management application built with React, Node.js, Express, and MongoDB. Features include task creation, assignment, and progress tracking.",
      techStack: [
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
        { name: "Express", icon: <SiExpress className="text-gray-700" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
      ],
      githubUrl: "https://github.com/shivangrai5143/Project-Management-App",
    },
  ];

  return (
    <div className="min-h-screen bg-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-center">
          Projects
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          A showcase of my recent work and side projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 min-h-[80px]">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <div
                          key={`${project.id}-${tech.name}`}
                          className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                        >
                          <span className="text-lg">{tech.icon}</span>
                          <span className="text-gray-700">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <FaExternalLinkAlt size={14} />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                  >
                    <FaGithub size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
