/**
 * Consolidated skill data — single source of truth.
 * Previously duplicated across: constants/skills.js, TechStack.jsx inline, githubUtils.js
 */
export const skillCategories = {
  "Frontend": [
    { label: "React.js", iconName: "SiReact", color: "#61DAFB", category: "Frontend" },
    { label: "Next.js", iconName: "SiNextdotjs", color: "#ffffff", category: "Frontend" },
    { label: "Redux Toolkit", iconName: "SiRedux", color: "#764ABC", category: "Frontend" },
    { label: "TypeScript", iconName: "SiTypescript", color: "#3178C6", category: "Frontend" },
    { label: "JavaScript (ES6+)", iconName: "SiJavascript", color: "#F7DF1E", category: "Frontend" },
    { label: "Tailwind CSS", iconName: "SiTailwindcss", color: "#38BDF8", category: "Frontend" },
    { label: "Vite", iconName: "SiVite", color: "#646CFF", category: "Frontend" },
    { label: "HTML5/CSS3", iconName: "SiHtml5", color: "#E34F26", category: "Frontend" },
  ],

  "Backend": [
    { label: "C#", iconName: "SiCsharp", color: "#239120", category: "Backend" },
    { label: ".NET MVC", iconName: "SiDotnet", color: "#512BD4", category: "Backend" },
    { label: "ASP.NET Core", iconName: "SiDotnet", color: "#512BD4", category: "Backend" },
    { label: "Node.js", iconName: "SiNodedotjs", color: "#68A063", category: "Backend" },
    { label: "Express.js", iconName: "SiExpress", color: "#c0bebe", category: "Backend" },
    { label: "Python", iconName: "SiPython", color: "#3776AB", category: "Backend" },
    { label: "FastAPI", iconName: "SiFastapi", color: "#009688", category: "Backend" },
    { label: "RESTful APIs", iconName: "SiPostman", color: "#FF6C37", category: "Backend" },
    { label: "WebSockets", iconName: "SiSocketdotio", color: "#010101", category: "Backend" },
  ],

  "AI & Automation": [
    { label: "Multi-Agent AI Pipelines", iconName: "SiOpenai", color: "#10A37F", category: "AI & Automation" },
    { label: "Gemini API", iconName: "SiGoogle", color: "#4285F4", category: "AI & Automation" },
    { label: "MCP (Model Context Protocol)", iconName: "SiAnthropic", color: "#D97706", category: "AI & Automation" },
    { label: "Pydantic Schemas", iconName: "SiPython", color: "#3776AB", category: "AI & Automation" },
    { label: "SSE", iconName: "SiFastapi", color: "#009688", category: "AI & Automation" },
  ],

  "Databases & Data": [
    { label: "SQL Server", iconName: "SiMicrosoftsqlserver", color: "#CC292B", category: "Databases & Data" },
    { label: "PostgreSQL", iconName: "SiPostgresql", color: "#336791", category: "Databases & Data" },
    { label: "MongoDB", iconName: "SiMongodb", color: "#4DB33D", category: "Databases & Data" },
    { label: "MySQL", iconName: "SiMysql", color: "#4479A1", category: "Databases & Data" },
    { label: "Redis", iconName: "SiRedis", color: "#DC382D", category: "Databases & Data" },
    { label: "Firebase Firestore", iconName: "SiFirebase", color: "#FFCA28", category: "Databases & Data" },
    { label: "Pandas", iconName: "SiPandas", color: "#150458", category: "Databases & Data" },
    { label: "NumPy", iconName: "SiNumpy", color: "#013243", category: "Databases & Data" },
  ],

  "DevOps & Tools": [
    { label: "Git/GitHub", iconName: "SiGit", color: "#F05032", category: "DevOps & Tools" },
    { label: "Docker", iconName: "SiDocker", color: "#2496ED", category: "DevOps & Tools" },
    { label: "GitHub Actions", iconName: "SiGithubactions", color: "#2088FF", category: "DevOps & Tools" },
    { label: "AWS (EC2, S3)", iconName: "SiAmazonaws", color: "#FF9900", category: "DevOps & Tools" },
    { label: "Nginx", iconName: "SiNginx", color: "#009639", category: "DevOps & Tools" },
    { label: "Firebase", iconName: "SiFirebase", color: "#FFCA28", category: "DevOps & Tools" },
    { label: "Vercel", iconName: "SiVercel", color: "#ffffff", category: "DevOps & Tools" },
    { label: "Render", iconName: "SiRender", color: "#46E3B7", category: "DevOps & Tools" },
  ],

  "Languages": [
    { label: "C#", iconName: "SiCsharp", color: "#239120", category: "Languages" },
    { label: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E", category: "Languages" },
    { label: "TypeScript", iconName: "SiTypescript", color: "#3178C6", category: "Languages" },
    { label: "Python", iconName: "SiPython", color: "#3776AB", category: "Languages" },
    { label: "Java", iconName: "FaJava", color: "#F89820", category: "Languages" },
    { label: "C++", iconName: "SiCplusplus", color: "#00599C", category: "Languages" },
    { label: "SQL", iconName: "SiMicrosoftsqlserver", color: "#CC292B", category: "Languages" },
  ],
};

/** Flat list of all skills */
export const allSkills = Object.values(skillCategories).flat();

/** Category tab names including "All" */
export const skillTabs = ["All", ...Object.keys(skillCategories)] as const;
