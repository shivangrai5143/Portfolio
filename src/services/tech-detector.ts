import type { Skill, SkillCategory } from '@/types';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'shivangrai5143';

// Maps npm package names or github language strings to a standardized Skill structure
const TECH_DICTIONARY: Record<string, { name: string, category: SkillCategory, iconName: string }> = {
  // Frontend
  'react': { name: 'React', category: 'Frontend', iconName: 'SiReact' },
  'next': { name: 'Next.js', category: 'Frontend', iconName: 'SiNextdotjs' },
  'vue': { name: 'Vue.js', category: 'Frontend', iconName: 'SiVite' },
  'tailwindcss': { name: 'Tailwind CSS', category: 'Frontend', iconName: 'SiTailwindcss' },
  'framer-motion': { name: 'Framer Motion', category: 'Frontend', iconName: 'SiFramer' },
  
  // Backend
  'express': { name: 'Express', category: 'Backend', iconName: 'SiExpress' },
  'mongoose': { name: 'MongoDB', category: 'Backend', iconName: 'SiMongodb' },
  'mongodb': { name: 'MongoDB', category: 'Backend', iconName: 'SiMongodb' },
  'firebase': { name: 'Firebase', category: 'Backend', iconName: 'SiFirebase' },
  'firebase-admin': { name: 'Firebase', category: 'Backend', iconName: 'SiFirebase' },
  'socket.io': { name: 'Socket.io', category: 'Backend', iconName: 'SiSocketdotio' },
  'prisma': { name: 'Prisma', category: 'Backend', iconName: 'SiPrisma' },
  
  // Languages
  'typescript': { name: 'TypeScript', category: 'Frontend', iconName: 'SiTypescript' },
  'javascript': { name: 'JavaScript', category: 'Frontend', iconName: 'SiJavascript' },
  'python': { name: 'Python', category: 'Backend', iconName: 'SiPython' },
  'java': { name: 'Java', category: 'Backend', iconName: 'FaJava' },
  'c++': { name: 'C++', category: 'Backend', iconName: 'SiC' },
  
  // Tools
  'vite': { name: 'Vite', category: 'Tools & DevOps', iconName: 'SiVite' },
  'eslint': { name: 'ESLint', category: 'Tools & DevOps', iconName: 'SiEslint' },
  'jest': { name: 'Jest', category: 'Tools & DevOps', iconName: 'SiJest' },
};

/**
 * Fetches file content from a GitHub repository
 */
async function fetchRepoFile(repoName: string, path: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/${path}`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3.raw',
  };
  
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Parses package.json to extract dependencies and map them to recognized skills
 */
async function detectFromPackageJson(repoName: string): Promise<string[]> {
  const content = await fetchRepoFile(repoName, 'package.json');
  if (!content) return [];

  try {
    const pkg = JSON.parse(content);
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const detected = new Set<string>();

    for (const dep of Object.keys(deps)) {
      // Basic matching: if dependency name is in dictionary or contains a dictionary key
      for (const key of Object.keys(TECH_DICTIONARY)) {
        if (dep === key || dep.includes(`/${key}`)) {
          detected.add(TECH_DICTIONARY[key].name);
        }
      }
    }
    return Array.from(detected);
  } catch {
    return [];
  }
}

/**
 * Scans a repo to detect its tech stack using API languages + package files
 */
export async function detectRepoTechStack(repoName: string, languages: string[]): Promise<string[]> {
  const detected = new Set<string>();

  // Add recognized languages
  for (const lang of languages) {
    const lowerLang = lang.toLowerCase();
    if (TECH_DICTIONARY[lowerLang]) {
      detected.add(TECH_DICTIONARY[lowerLang].name);
    } else {
      // If language not mapped specifically, add it raw
      detected.add(lang);
    }
  }

  // Add from package.json
  const npmSkills = await detectFromPackageJson(repoName);
  for (const skill of npmSkills) {
    detected.add(skill);
  }

  return Array.from(detected);
}

/**
 * Takes raw tech name arrays from all repos and aggregates them into weighted Skill objects
 */
export function aggregateSkills(allRepoTechs: string[][]): Skill[] {
  const counts: Record<string, number> = {};
  
  for (const techs of allRepoTechs) {
    for (const tech of techs) {
      counts[tech] = (counts[tech] || 0) + 1;
    }
  }

  const skills: Skill[] = [];

  for (const [techName, count] of Object.entries(counts)) {
    // Find the dictionary entry for this tech
    const dictEntry = Object.values(TECH_DICTIONARY).find(d => d.name === techName);
    
    // Default fallback if not in dictionary
    const category = dictEntry?.category || 'Tools & DevOps';
    const iconName = dictEntry?.iconName || 'SiGithub';

    // Calculate a basic proficiency score based on frequency (max 100)
    // Formula: Cap at 100, where 5 projects = 100%
    const proficiency = Math.min(100, Math.round((count / 5) * 100));

    skills.push({
      label: techName,
      category,
      iconName: iconName,
      color: '#3b82f6', // You can add logic to map colors later if desired, using blue as default
      proficiency,
    });
  }

  return skills.sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0));
}
