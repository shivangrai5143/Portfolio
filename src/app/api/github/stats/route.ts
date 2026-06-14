import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function GET() {
  try {
    const service = GitHubService.getInstance();
    const stats = await service.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('[API /github/stats]', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
