import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "the-roasting-house",
    title: "The Roasting House",
    description:
      "A collaborative MERN stack project simulating a real-world coffee shop with menu browsing, order management, and a responsive UI. Features JWT auth, Socket.io for real-time updates, Redux Toolkit, and an admin dashboard.",
    image: "",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Redux Toolkit", "JWT", "REST API"],
    githubUrl: "https://github.com/VivekYadav-77/The-Roasting-House",
    liveUrl: "",
    featured: true,
  },
  {
    id: "aptico",
    title: "Aptico",
    description:
      "Aptico is built for people who are applying to jobs, improving their resume, preparing for interviews, and trying to stay consistent through a long hiring process. Features AI-powered resume tools, gamification, and resilience tracking.",
    image: "",
    techStack: ["JavaScript", "Fastify", "PostgreSQL", "Redis", "Drizzle ORM", "Gemini AI", "Monorepo", "Vercel"],
    githubUrl: "https://github.com/VivekYadav-77/Aptico",
    liveUrl: "https://aptico-dev.vercel.app",
    featured: true,
  },
  {
    id: "chat-app",
    title: "Chat App",
    description:
      "A full-stack chat app built with React.js, Firebase, and WebRTC, enabling real-time messaging, one-to-one & group chats, status stories, end-to-end encrypted messages, and voice/video calling.",
    image: "",
    techStack: ["React", "Firebase", "WebRTC", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/CHAT-APP",
    liveUrl: "https://chat-app-brown-zeta-84.vercel.app",
    featured: true,
  },
  {
    id: "traffic-intelligence-system",
    title: "Traffic Intelligence System",
    description:
      "Traffic Intelligence System is a full-stack data analytics platform that analyzes road accident and transport datasets to uncover patterns and insights. Built with React, Python, and pandas, it features interactive dashboards, API-driven architecture, and data visualization to support traffic analysis and decision-making.",
    image: "",
    techStack: ["React", "Python", "pandas", "JavaScript", "Tailwind CSS", "Data Analytics"],
    githubUrl: "https://github.com/shivangrai5143/Traffic-intelligence-System",
    liveUrl: "https://intelligent-traffic.vercel.app/",
    featured: true,
  },
  {
    id: "yojna-flow",
    title: "Yojna Flow",
    description:
      "A full-stack project management system with Firebase authentication and Firestore database.",
    image: "",
    techStack: ["React", "Firebase", "Firestore", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/Yojna-Flow",
    liveUrl: "https://yojnaflow.vercel.app",
    featured: true,
  },
];
