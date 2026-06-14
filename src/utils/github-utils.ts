import {
  SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiFirebase,
  SiGit, SiTailwindcss, SiHtml5, SiCss, SiExpress,
  SiMysql, SiPython, SiC, SiGithub, SiPostman,
  SiDocker, SiPostgresql, SiTypescript, SiSocketdotio, SiWebrtc, SiDjango,
  SiNextdotjs, SiRedux, SiVite, SiVercel, SiNpm, SiYarn,
  SiPrisma, SiGraphql, SiJest, SiEslint, SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

/**
 * Maps technology name → { icon, color }
 * Used by ProjectCard, CurrentProject, and any component that needs tech badges.
 */
const techDetailsMap: Record<string, { icon: IconType; color: string }> = {
  // Frontend
  react: { icon: SiReact, color: "#61DAFB" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  html: { icon: SiHtml5, color: "#E34F26" },
  html5: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#2965F1" },
  css3: { icon: SiCss, color: "#2965F1" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  tailwindcss: { icon: SiTailwindcss, color: "#38BDF8" },
  "next.js": { icon: SiNextdotjs, color: "#ffffff" },
  nextjs: { icon: SiNextdotjs, color: "#ffffff" },
  redux: { icon: SiRedux, color: "#764ABC" },
  vite: { icon: SiVite, color: "#646CFF" },

  // Backend
  "node.js": { icon: SiNodedotjs, color: "#68A063" },
  nodejs: { icon: SiNodedotjs, color: "#68A063" },
  node: { icon: SiNodedotjs, color: "#68A063" },
  express: { icon: SiExpress, color: "#c0bebe" },
  "express.js": { icon: SiExpress, color: "#c0bebe" },
  django: { icon: SiDjango, color: "#092E20" },
  python: { icon: SiPython, color: "#3776AB" },
  java: { icon: FaJava, color: "#F89820" },
  c: { icon: SiC, color: "#A8B9CC" },

  // Database
  mongodb: { icon: SiMongodb, color: "#4DB33D" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  postgresql: { icon: SiPostgresql, color: "#336791" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  prisma: { icon: SiPrisma, color: "#2D3748" },

  // Real-time
  "socket.io": { icon: SiSocketdotio, color: "#8e8e8e" },
  socketio: { icon: SiSocketdotio, color: "#8e8e8e" },
  webrtc: { icon: SiWebrtc, color: "#EC5F59" },

  // Tools
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: "#c0bebe" },
  docker: { icon: SiDocker, color: "#2496ED" },
  postman: { icon: SiPostman, color: "#FF6C37" },
  graphql: { icon: SiGraphql, color: "#E535AB" },
  jest: { icon: SiJest, color: "#C21325" },
  eslint: { icon: SiEslint, color: "#4B32C3" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  vercel: { icon: SiVercel, color: "#ffffff" },
  npm: { icon: SiNpm, color: "#CB3837" },
  yarn: { icon: SiYarn, color: "#2C8EBB" },
};

/** Fallback icon for unknown techs */
const fallback = { icon: SiGithub, color: "#64748b" };

/**
 * Look up icon + color for a technology name.
 * Case-insensitive, supports common aliases.
 */
export function getTechDetails(name: string): { icon: IconType; color: string } {
  return techDetailsMap[name.toLowerCase()] ?? fallback;
}

/**
 * Convert an array of tech name strings to { name, Icon, color } objects.
 */
export function formatTechStack(techNames: string[]) {
  return techNames.map((name) => {
    const details = getTechDetails(name);
    return { name, Icon: details.icon, color: details.color };
  });
}

/**
 * Get the icon component for a skill by its iconName string.
 * Used by the TechStack section which stores icon names as strings.
 */
const iconNameMap: Record<string, IconType> = {
  SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiFirebase,
  SiGit, SiTailwindcss, SiHtml5, SiCss, SiCss3: SiCss, SiExpress,
  SiMysql, SiPython, SiC, SiGithub, SiPostman,
  SiDocker, SiPostgresql, SiTypescript, SiSocketdotio, SiWebrtc, SiDjango,
  SiNextdotjs, SiRedux, SiVite, SiVercel, SiNpm, SiYarn,
  SiPrisma, SiGraphql, SiJest, SiEslint, SiFigma,
  FaJava,
};

export function getIconByName(iconName: string): IconType {
  return iconNameMap[iconName] ?? SiGithub;
}
