import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function GET() {
  try {
    const service = GitHubService.getInstance();
    const current = await service.getCurrentProject();

    if (!current) {
      return NextResponse.json(
        { error: 'No current project found' },
        { status: 404 }
      );
    }

    return NextResponse.json(current);
  } catch (error) {
    console.error('[API /github/current]', error);
    return NextResponse.json(
      { error: 'Failed to fetch current project' },
      { status: 500 }
    );
  }
}
