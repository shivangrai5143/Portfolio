/**
 * Static fallback data for the About section.
 * This is used when Firestore data is unavailable or not yet populated.
 * Once you update the About section via the Admin Dashboard, Firestore data will take precedence.
 */

export interface AboutData {
  bio: string[];
  whatIBring: string[];
  lookingFor: {
    title: string;
    description: string;
    points: string[];
  };
  availableForWork: boolean;
}

export const aboutFallback: AboutData = {
  bio: [
    "I'm a passionate Full Stack Developer with a keen interest in building modern, scalable web applications. My journey in software development started with a curiosity for problem-solving and has evolved into a dedication to creating elegant, user-centered solutions.",
    "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and love working on full-stack projects where I can bring ideas to life from concept to deployment. My approach combines technical expertise with a strong focus on user experience and clean code practices.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, and continuously learning to stay at the forefront of web development.",
  ],
  whatIBring: [
    "Full-stack web development with MERN stack",
    "Responsive & mobile-first UI design",
    "RESTful API development & integration",
    "Real-time applications with Firebase",
    "Cloud deployment & DevOps basics",
    "Version control with Git & GitHub",
  ],
  lookingFor: {
    title: "What I'm Looking For",
    description:
      "I'm actively seeking opportunities as a Software Developer or SDE Internship where I can:",
    points: [
      "Work on challenging real-world projects",
      "Collaborate with experienced developers",
      "Contribute to impactful products",
      "Continue learning and growing as a developer",
    ],
  },
  availableForWork: true,
};
