import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "aptico",
    title: "Aptico — Career Progress & Gamification Platform",
    description:
      "Architected a 3-agent AI orchestration system (Auditor, Strategist, Copywriter) via Gemini API with Pydantic validation, eliminating untyped JSON output failures. Implemented Server-Sent Events (SSE) for zero-polling live feedback on React UI, integrating Redis-cached XP progression and leaderboard rankings.",
    image: "",
    techStack: ["React.js", "FastAPI", "Gemini API", "Pydantic", "Redis"],
    githubUrl: "https://github.com/VivekYadav-77/Aptico",
    liveUrl: "https://aptico-dev.vercel.app",
    featured: true,
  },
  {
    id: "chat-app",
    title: "Real-Time Chat & Calling Application",
    description:
      "Engineered messaging platform with Firebase Firestore snapshot listeners, supporting 1-on-1/group chats, typing indicators, and presence tracking with sub-second latency. Integrated WebRTC mesh architecture for direct peer-to-peer encrypted voice and video calls with automated client-side media compression.",
    image: "",
    techStack: ["React.js", "Firebase Firestore", "WebRTC", "Tailwind CSS"],
    githubUrl: "https://github.com/shivangrai5143/CHAT-APP",
    liveUrl: "https://chat-app-brown-zeta-84.vercel.app",
    featured: true,
  },
  {
    id: "traffic-intelligence-system",
    title: "Traffic Intelligence & Analytics System",
    description:
      "Processed 50k+ road transport records using Pandas & NumPy to analyze accident clusters, casualty severity, and peak congestion trends. Created interactive heatmaps using Leaflet and React, powered by asynchronous FastAPI endpoints for rapid data filtering.",
    image: "",
    techStack: ["Python", "FastAPI", "React.js", "Pandas", "Leaflet"],
    githubUrl: "https://github.com/shivangrai5143/Traffic-intelligence-System",
    liveUrl: "https://intelligent-traffic.vercel.app/",
    featured: true,
  },
  {
    id: "the-roasting-house",
    title: "The Roasting House — E-Commerce Platform",
    description:
      "Built an e-commerce platform with JWT authentication, role-based access control (Admin/Customer), persistent cart state, and order lifecycle workflows. Integrated AWS S3 for product media uploads and configured automated GitHub Actions CI/CD workflows for continuous deployment.",
    image: "",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS S3"],
    githubUrl: "https://github.com/VivekYadav-77/The-Roasting-House",
    liveUrl: "",
    featured: true,
  },
];
