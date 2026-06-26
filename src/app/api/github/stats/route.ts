import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { getAdminDocument } from '@/lib/firestore-admin';
import type { GitHubStats } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Try Firestore (Admin SDK) — failure is non-fatal
  try {
    const fsStats = await getAdminDocument<GitHubStats>('platform', 'stats');
    if (fsStats) {
      return NextResponse.json(fsStats);
    }
  } catch (fsError) {
    console.warn('[API /github/stats] Firestore unavailable, falling back to GitHub API:', fsError);
  }

  // 2. Fallback: GitHub API directly
  try {
    const service = GitHubService.getInstance();
    const stats = await service.getStats();
    if (stats) return NextResponse.json(stats);
    return NextResponse.json({ error: 'No stats available' }, { status: 404 });
  } catch (error) {
    console.error('[API /github/stats] GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
