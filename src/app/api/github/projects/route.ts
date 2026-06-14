import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function GET() {
  try {
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
