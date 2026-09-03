import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: 1,
    type: "work",
    title: "Software Developer Intern (React & .NET)",
    org: "Scurry Infotech LLP",
    duration: "Aug 2026 – Present",
    badge: "Active",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    points: [
      "Frontend Development : Translated 15+ complex Figma mockups into fully responsive React components, ensuring strict cross-browser compatibility and improving client-side routing.",
      ".NET MVC & REST APIs : Configured working Docker environments for the frontend architecture, streamlining local development and reducing onboarding setup time by roughly 40%.",
      "Database & SQL Server : Engineered and maintained 10+ REST API endpoints in .NET MVC, successfully handling data routing for core business modules.",
      "Debugging & Git Collaboration : Resolved 20+ critical bugs across the frontend and backend during agile sprints, significantly boosting system stability.",
    ],
    tags: ["React.js", ".NET MVC", "C#", "SQL Server", "REST APIs", "Git"],
  },
];

export const education: Experience[] = [
  {
    id: 2,
    type: "education",
    title: "Bachelor of Technology (B.Tech) in Computer Science & Information Technology",
    org: "Babu Banarasi Das University",
    duration: "Expected: May 2027",
    badge: "Pursuing",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    points: [
      "Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks",
      "Proficient in full-stack architecture, REST API engineering, real-time systems, and AI multi-agent orchestration",
    ],
    tags: ["Data Structures", "DBMS", "Operating Systems", "Computer Networks"],
  },
];
