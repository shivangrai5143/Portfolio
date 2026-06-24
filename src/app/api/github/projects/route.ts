import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { getCollection } from '@/lib/firestore';
import type { Project, GitHubRepo } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Try to fetch from Firestore
    const fsProjects = await getCollection<Project>('projects');
    
    if (fsProjects.length > 0) {
      // Format Firestore Project to look like GitHubRepo for the frontend
      const formattedForFrontend = fsProjects.map(p => ({
        name: p.title || p.id,
        description: p.description || '',
        htmlUrl: p.githubUrl || '',
        homepage: p.liveUrl || '',
        stars: p.stars || 0,
        forks: p.forks || 0,
        language: p.techStack[0] || '',
        topics: p.featured ? ['featured'] : [],
        updatedAt: p.updatedAt || '',
        isArchived: false,
        isFork: false,
      }));
      return NextResponse.json(formattedForFrontend);
    }

    // 2. Fallback to GitHub API directly if Firestore is empty
    const service = GitHubService.getInstance();
    const projects = await service.getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('[API /github/projects]', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects' },
      { status: 500 }
    );
  }
}
