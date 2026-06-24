import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { getDocument } from '@/lib/firestore';
import type { GitHubStats } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Try to fetch from Firestore
    const fsStats = await getDocument<GitHubStats>('platform', 'stats');
    if (fsStats) {
      return NextResponse.json(fsStats);
    }

    // 2. Fallback to GitHub API directly if Firestore is empty
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
