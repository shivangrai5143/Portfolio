import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: 1,
    type: "work",
    title: "Web Development Intern",
    org: "Prodigy Infotech",
    duration: "July 2024 – August 2024",
    badge: "Remote",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    points: [
      "Developed responsive web applications using React.js and Tailwind CSS",
      "Collaborated with the dev team to implement features and fix bugs",
      "Created reusable component libraries to improve development efficiency",
      "Participated in code reviews and followed clean-code best practices",
      "Used Git & GitHub for version control across all projects",
    ],
    tags: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS", "Git"],
  },
];

export const education: Experience[] = [
  {
    id: 2,
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    org: "Babu Banarasi Das University",
    duration: "2023 - 2027",
    badge: "Pursuing",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    points: [
      "Core subjects: Data Structures, DBMS, OS, Computer Networks, OOP",
      "Built multiple full-stack projects as part of coursework and self-learning",
      "Relevant coursework: Web Development, Software Engineering, Algorithms",
    ],
    tags: ["Java", "Python", "C", "Web Dev"],
  },
];
