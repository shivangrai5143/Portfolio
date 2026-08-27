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
      "Frontend Development: Built and maintained responsive, cross-browser web interfaces using React.js, JavaScript, HTML, and CSS, managing client-side application routes for smooth navigation.",
      ".NET MVC & REST APIs: Developed and modified application features in .NET MVC (C#), engineering REST APIs and backend request routing for seamless frontend-backend communication.",
      "Database & SQL Server: Managed database operations with SQL Server, executing queries and optimizing data retrieval for core business modules.",
      "Debugging & Git Collaboration: Diagnosed and resolved end-to-end frontend and backend issues to boost system stability, using Git for version control within an agile team environment.",
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
