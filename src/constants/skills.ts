import type { SkillData } from "@/types";

/**
 * Consolidated skill data — single source of truth.
 * Previously duplicated across: constants/skills.js, TechStack.jsx inline, githubUtils.js
 */
export const skillCategories: SkillData = {
  Frontend: [
    { label: "React", iconName: "SiReact", color: "#61DAFB" },
    { label: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E" },
    { label: "TypeScript", iconName: "SiTypescript", color: "#3178C6" },
    { label: "HTML5", iconName: "SiHtml5", color: "#E34F26" },
    { label: "CSS3", iconName: "SiCss3", color: "#2965F1" },
    { label: "Tailwind", iconName: "SiTailwindcss", color: "#38BDF8" },
  ],
  Backend: [
    { label: "Node.js", iconName: "SiNodedotjs", color: "#68A063" },
    { label: "Express", iconName: "SiExpress", color: "#c0bebe" },
    { label: "MongoDB", iconName: "SiMongodb", color: "#4DB33D" },
    { label: "MySQL", iconName: "SiMysql", color: "#4479A1" },
    { label: "PostgreSQL", iconName: "SiPostgresql", color: "#336791" },
    { label: "Socket.io", iconName: "SiSocketdotio", color: "#8e8e8e" },
    { label: "WebRTC", iconName: "SiWebrtc", color: "#EC5F59" },
    { label: "Firebase", iconName: "SiFirebase", color: "#FFCA28" },
    { label: "Python", iconName: "SiPython", color: "#3776AB" },
    { label: "Java", iconName: "FaJava", color: "#F89820" },
    { label: "C", iconName: "SiC", color: "#A8B9CC" },
    { label: "Django", iconName: "SiDjango", color: "#092E20" },
  ],
  "Tools & DevOps": [
    { label: "Git", iconName: "SiGit", color: "#F05032" },
    { label: "GitHub", iconName: "SiGithub", color: "#c0bebe" },
    { label: "Docker", iconName: "SiDocker", color: "#2496ED" },
    { label: "Postman", iconName: "SiPostman", color: "#FF6C37" },
  ],
};

/** Flat list of all skills */
export const allSkills = Object.values(skillCategories).flat();

/** Category tab names including "All" */
export const skillTabs = ["All", ...Object.keys(skillCategories)] as const;
