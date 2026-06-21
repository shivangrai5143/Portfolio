/**
 * Consolidated skill data — single source of truth.
 * Previously duplicated across: constants/skills.js, TechStack.jsx inline, githubUtils.js
 */
export const skillCategories = {
  "Frontend Development": [
    { label: "React.js", iconName: "SiReact", color: "#61DAFB", category: "Frontend Development" },
    { label: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E", category: "Frontend Development" },
    { label: "TypeScript", iconName: "SiTypescript", color: "#3178C6", category: "Frontend Development" },
    { label: "HTML5", iconName: "SiHtml5", color: "#E34F26", category: "Frontend Development" },
    { label: "CSS3", iconName: "SiCss3", color: "#2965F1", category: "Frontend Development" },
    { label: "Tailwind CSS", iconName: "SiTailwindcss", color: "#38BDF8", category: "Frontend Development" },
  ],

  "Backend Development": [
    { label: "Node.js", iconName: "SiNodedotjs", color: "#68A063", category: "Backend Development" },
    { label: "Express.js", iconName: "SiExpress", color: "#c0bebe", category: "Backend Development" },
    { label: "Django", iconName: "SiDjango", color: "#092E20", category: "Backend Development" },
    { label: "Firebase", iconName: "SiFirebase", color: "#FFCA28", category: "Backend Development" },
    { label: "Socket.io", iconName: "SiSocketdotio", color: "#8e8e8e", category: "Backend Development" },
    { label: "WebRTC", iconName: "SiWebrtc", color: "#EC5F59", category: "Backend Development" },
  ],

  Databases: [
    { label: "MongoDB", iconName: "SiMongodb", color: "#4DB33D", category: "Databases" },
    { label: "MySQL", iconName: "SiMysql", color: "#4479A1", category: "Databases" },
    { label: "PostgreSQL", iconName: "SiPostgresql", color: "#336791", category: "Databases" },
  ],

  Languages: [
    { label: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E", category: "Languages" },
    { label: "TypeScript", iconName: "SiTypescript", color: "#3178C6", category: "Languages" },
    { label: "Python", iconName: "SiPython", color: "#3776AB", category: "Languages" },
    { label: "Java", iconName: "FaJava", color: "#F89820", category: "Languages" },
    { label: "C", iconName: "SiC", color: "#A8B9CC", category: "Languages" },
  ],

  "Cloud & DevOps": [
    { label: "AWS", iconName: "SiAmazonaws", color: "#FF9900", category: "Cloud & DevOps" },
    { label: "Docker", iconName: "SiDocker", color: "#2496ED", category: "Cloud & DevOps" },
    { label: "Git", iconName: "SiGit", color: "#F05032", category: "Cloud & DevOps" },
    { label: "GitHub", iconName: "SiGithub", color: "#c0bebe", category: "Cloud & DevOps" },
    { label: "Postman", iconName: "SiPostman", color: "#FF6C37", category: "Cloud & DevOps" },
  ],
};

/** Flat list of all skills */
export const allSkills = Object.values(skillCategories).flat();

/** Category tab names including "All" */
export const skillTabs = ["All", ...Object.keys(skillCategories)] as const;
