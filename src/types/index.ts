// ─── Portfolio 2.0 — TypeScript Interfaces ─────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isGithub?: boolean;
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export interface Skill {
  label: string;
  iconName: string;
  color: string;
  category?: string;
  proficiency?: number;
}

export type SkillCategory = "Frontend" | "Backend" | "Tools & DevOps";

export type SkillData = Record<SkillCategory, Skill[]>;

export interface Experience {
  id: number;
  type: "work" | "education";
  title: string;
  org: string;
  duration: string;
  badge: string;
  badgeColor: string;
  points: string[];
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
  hoverColor: string;
}

export interface SiteConfig {
  name: string;
  email: string;
  title: string;
  description: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  siteUrl: string;
  socialLinks: SocialLink[];
}

export interface GitHubRepo {
  name: string;
  description: string;
  htmlUrl: string;
  homepage: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  updatedAt: string;
  isArchived: boolean;
  isFork: boolean;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  techStack: string[];
  languages: string[];
  topLanguages: Record<string, number>;
}

export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  summary?: string;
  skills: string[];
  projects: ResumeProject[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
}

export interface ResumeProject {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ResumeExperience {
  title: string;
  company: string;
  duration: string;
  points: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  duration: string;
  details?: string[];
}

// Firebase document types
export interface FirestoreProject extends Omit<Project, "techStack"> {
  techStack: string[];
  createdAt?: string;
  syncedFromGitHub?: boolean;
}

export interface FirestoreSkill {
  name: string;
  category: SkillCategory;
  icon: string;
  color: string;
  proficiency?: number;
}

export interface FirestoreSettings {
  githubUsername: string;
  linkedin: string;
  portfolioUrl: string;
  lastSyncAt?: string;
}
