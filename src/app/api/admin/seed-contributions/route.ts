import { NextResponse } from 'next/server';
import { setDocument } from '@/lib/firestore';

// Force dynamic rendering — prevents Next.js from executing this route
// at build time when Firebase environment variables are not available.
export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/seed-contributions
 * Seeds manually-known contribution projects into Firestore.
 * Call once from admin panel.
 */
export async function POST() {
  const contributions = [
    {
      id: 'the-roasting-house',
      title: 'The Roasting House',
      description:
        'A collaborative MERN stack project simulating a real-world coffee shop with menu browsing, order management, and a responsive UI. Features JWT auth, Socket.io for real-time updates, Redux Toolkit, and an admin dashboard.',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redux Toolkit', 'JWT', 'REST API'],
      githubUrl: 'https://github.com/VivekYadav-77/The-Roasting-House',
      liveUrl: '',
      featured: true,
      stars: 2,
      isContribution: true,
      ownerLogin: 'VivekYadav-77',
    },
    {
      id: 'aptico',
      title: 'Aptico',
      description:
        'Aptico is built for people who are applying to jobs, improving their resume, preparing for interviews, and trying to stay consistent through a long hiring process. Features AI-powered resume tools, gamification, and resilience tracking.',
      techStack: ['JavaScript', 'Fastify', 'PostgreSQL', 'Redis', 'Drizzle ORM', 'Gemini AI', 'Monorepo', 'Vercel'],
      githubUrl: 'https://github.com/VivekYadav-77/Aptico',
      liveUrl: 'https://aptico-dev.vercel.app',
      featured: true,
      stars: 0,
      isContribution: true,
      ownerLogin: 'VivekYadav-77',
    },
  ];

  for (const project of contributions) {
    await setDocument('projects', project.id, project);
  }

  return NextResponse.json({ success: true, seeded: contributions.length });
}
