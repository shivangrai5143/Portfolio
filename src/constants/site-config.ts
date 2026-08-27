import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Shivang Rai",
  email: "raishivang69@gmail.com",
  title: "Full-Stack Developer · AI Automation & Data Science",
  description:
    "Full-Stack Developer with hands-on experience building scalable web applications, AI multi-agent orchestration, and production backend systems. Proficient in React.js, .NET MVC, C#, SQL Server, Node.js, and Python.",
  githubUsername: "shivangrai5143",
  githubUrl: "https://github.com/shivangrai5143",
  linkedinUrl: "https://linkedin.com/in/shivang-rai-58b45728b",
  twitterUrl: "https://x.com/raishivang_69",
  siteUrl: "https://shivang-2005.vercel.app",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/shivangrai5143",
      iconName: "FaGithub",
      hoverColor: "hover:text-white",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/shivang-rai-58b45728b",
      iconName: "FaLinkedin",
      hoverColor: "hover:text-blue-500",
    },
    {
      platform: "Twitter",
      url: "https://x.com/raishivang_69",
      iconName: "FaXTwitter",
      hoverColor: "hover:text-white",
    },
  ],
};

export const ROLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Open Source Enthusiast",
];

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "stats", label: "Stats" },
  { id: "experience", label: "Experience" },
  { id: "connect", label: "Connect" },
] as const;
