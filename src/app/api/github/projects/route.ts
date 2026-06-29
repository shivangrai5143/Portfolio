import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { getAdminCollection } from '@/lib/firestore-admin';
import type { Project, GitHubRepo } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const ALLOWED_IDS = [
    'the-roasting-house',
    'aptico',
    'chat-app',
    'traffic-intelligence-system',
    'yojna-flow',
  ];

  const matchesWhitelist = (id: string, url: string) => {
    const docId = id.toLowerCase();
    const gitUrl = url.toLowerCase();
    return ALLOWED_IDS.includes(docId) ||
      gitUrl.includes("the-roasting-house") ||
      gitUrl.includes("aptico") ||
      gitUrl.includes("chat-app") ||
      gitUrl.includes("traffic-intelligence-system") ||
      gitUrl.includes("yojna-flow");
  };

  // 1. Try Firestore (Admin SDK) — failure is non-fatal
  try {
    const fsProjects = await getAdminCollection<Project>('projects', 'updatedAt', 'desc');

    if (fsProjects.length > 0) {
      const allowed = fsProjects.filter(p => matchesWhitelist(p.id || '', p.githubUrl || ''));
      const formattedForFrontend = allowed.map(p => ({
        name: p.title || p.id,
        description: p.description || '',
        htmlUrl: p.githubUrl || '',
        homepage: p.liveUrl || '',
        stars: p.stars || 0,
        forks: p.forks || 0,
        language: p.techStack?.[0] || '',
        topics: p.featured ? ['featured'] : [],
        updatedAt: p.updatedAt || '',
        isArchived: false,
        isFork: false,
      }));
      return NextResponse.json(formattedForFrontend);
    }
  } catch (fsError) {
    console.warn('[API /github/projects] Firestore unavailable, falling back to GitHub API:', fsError);
  }

  // 2. Fallback: GitHub API directly
  try {
    const service = GitHubService.getInstance();
    const projects = await service.getAllProjects();
    const allowed = projects.filter(p => {
      const name = p.name.toLowerCase();
      return name.includes('chat-app') || name.includes('traffic-intelligence-system') || name.includes('yojna-flow');
    });
    return NextResponse.json(allowed);
  } catch (error) {
    console.error('[API /github/projects] GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects' },
      { status: 500 }
    );
  }
}
