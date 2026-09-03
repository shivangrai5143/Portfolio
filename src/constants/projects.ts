import type { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "aptico",
    title: "APTICO — CAREER PROGRESS & GAMIFICATION PLATFORM",
    description:
      "Engineered a full-stack platform (Next.js, Fastify, PostgreSQL/Neon via Drizzle ORM) that transforms job-search activity into a gamified XP and achievement system, leveraging an event-driven architecture that decouples XP calculation from reward delivery. Integrated the Google Gemini API for AI-driven resume feedback and WebSockets for real-time multi-user progress synchronization; enforced Zod schema validation on the API layer and implemented TanStack Query on the frontend for type-safe, optimistic data fetching.",
    image: "",
    techStack: ["React.js", "FastAPI", "Gemini API", "Pydantic", "Redis"],
    githubUrl: "https://github.com/VivekYadav-77/Aptico",
    liveUrl: "https://aptico-dev.vercel.app",
    featured: true,
  },
  {
    id: "chat-app",
    title: "REAL-TIME CHAT & CALLING APPLICATION",
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
    title: "TRAFFIC INTELLIGENCE & ANALYTICS SYSTEM",
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
    title: "THE ROASTING HOUSE — E-COMMERCE PLATFORM",
    description:
      "Built a full-stack e-commerce platform (React, Node.js, Express, MongoDB) with JWT-based authentication (access/refresh tokens), OTP email verification, and a complete cart-to-checkout order flow. Implemented real-time order tracking using Socket.io for live status updates and an integrated Gemini API chatbot for customer support.",
    image: "",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS S3"],
    githubUrl: "https://github.com/VivekYadav-77/The-Roasting-House",
    liveUrl: "",
    featured: true,
  },
];
