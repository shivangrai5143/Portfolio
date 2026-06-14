import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Real-Time Chat Application",
    description:
      "A full-stack real-time chat application with private messaging, group chats, file sharing, and video calling capabilities.",
    image: "/chat_app_project_1.png",
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "WebRTC", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/Chat-Application",
    liveUrl: "",
    featured: true,
  },
  {
    id: "2",
    title: "Project Management App",
    description:
      "A comprehensive project management tool with Kanban boards, task assignment, and AI-powered team insights.",
    image: "/project-2.png",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/Project-Management-App",
    liveUrl: "",
    featured: true,
  },
  {
    id: "3",
    title: "Coffee Shop Web App",
    description:
      "An e-commerce platform for a coffee shop with user authentication, shopping cart, and Stripe payment integration.",
    image: "/project-3.png",
    techStack: ["React", "Express", "MongoDB", "Stripe", "Redux", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/Coffee-Shop-Web-App",
    liveUrl: "https://coffee-shop-demo.vercel.app",
    featured: true,
  },
  {
    id: "4",
    title: "Weather App",
    description:
      "A sleek weather application providing real-time forecasts, historical data, and interactive maps using OpenWeather API.",
    image: "/project-4.png",
    techStack: ["Vue.js", "JavaScript", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/Weather-App",
    liveUrl: "",
    featured: false,
  },
  {
    id: "5",
    title: "Portfolio",
    description:
      "A dynamic, highly interactive personal portfolio built with React and Framer Motion, featuring 3D elements and dark mode.",
    image: "/project-5.png",
    techStack: ["React", "Vite", "Framer Motion", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/shivangrai5143/Portfolio",
    liveUrl: "https://shivang-2005.vercel.app",
    featured: true,
  },
];
