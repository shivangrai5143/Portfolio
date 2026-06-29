/**
 * Static fallback data for Achievements.
 * Populate via Admin Dashboard → Achievements to override with Firestore data.
 */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
  category: "Hackathon" | "Award" | "Open Source" | "Academic" | "Community" | "Other";
  link?: string;
  featured?: boolean;
}

export const achievementsFallback: Achievement[] = [
  {
    id: "ach-1",
    title: "Open Source Contributor",
    description:
      "Contributed to multiple open-source projects on GitHub, helping improve documentation, fix bugs, and add new features.",
    date: "2024-01-01",
    category: "Open Source",
    featured: true,
  },
  {
    id: "ach-2",
    title: "Built 5+ Full Stack Projects",
    description:
      "Successfully designed and shipped more than 5 complete full-stack web applications from concept to deployment.",
    date: "2024-06-01",
    category: "Academic",
    featured: true,
  },
  {
    id: "ach-3",
    title: "Web Dev Internship at Prodigy Infotech",
    description:
      "Completed a professional web development internship, building real-world applications with React and Tailwind CSS.",
    date: "2024-08-01",
    category: "Award",
    featured: true,
  },
];
