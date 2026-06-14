import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Real-Time Chat Application",
    description:
      "A full-stack real-time chat application with private messaging, group chats, file sharing, and video calling capabilities.",
    image: "/chat_app_project_1.png",
    techStack: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Node.js", icon: "SiNodedotjs", color: "#68A063" },
      { name: "MongoDB", icon: "SiMongodb", color: "#4DB33D" },
      { name: "Socket.io", icon: "SiSocketdotio", color: "#8e8e8e" },
      { name: "WebRTC", icon: "SiWebrtc", color: "#EC5F59" },
      { name: "Tailwind", icon: "SiTailwindcss", color: "#38BDF8" },
    ],
    githubUrl: "https://github.com/shivangrai5143/Chat-Application",
    liveUrl: "",
    featured: true,
  },
  {
    id: "2",
    title: "Project Management App",
    description:
      "A comprehensive project management tool with task tracking, team collaboration, and real-time updates.",
    image: "/project_management_app_1.png",
    techStack: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Node.js", icon: "SiNodedotjs", color: "#68A063" },
      { name: "MongoDB", icon: "SiMongodb", color: "#4DB33D" },
      { name: "Express", icon: "SiExpress", color: "#c0bebe" },
      { name: "Tailwind", icon: "SiTailwindcss", color: "#38BDF8" },
    ],
    githubUrl: "https://github.com/shivangrai5143/Project-Management-Application",
    liveUrl: "",
    featured: true,
  },
  {
    id: "3",
    title: "Firebase Social App",
    description:
      "A social media platform with real-time feeds, user authentication, cloud storage, and responsive design.",
    image: "/chat_app_project_2.png",
    techStack: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
      { name: "Tailwind", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    ],
    githubUrl: "https://github.com/shivangrai5143/social-app",
    liveUrl: "",
    featured: true,
  },
  {
    id: "4",
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website with dark mode, animations, and GitHub integration.",
    image: "/project_management_app_2.png",
    techStack: [
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Tailwind", icon: "SiTailwindcss", color: "#38BDF8" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
      { name: "CSS3", icon: "SiCss3", color: "#2965F1" },
    ],
    githubUrl: "https://github.com/shivangrai5143/Portfolio",
    liveUrl: "https://shivang-2005.vercel.app",
    featured: false,
  },
];
