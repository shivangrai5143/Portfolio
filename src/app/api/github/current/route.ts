import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { getAdminDocument } from '@/lib/firestore-admin';
import type { GitHubRepo } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Try Firestore (Admin SDK) — failure is non-fatal
  try {
    const fsCurrent = await getAdminDocument<GitHubRepo>('platform', 'currentProject');
    if (fsCurrent) {
      return NextResponse.json(fsCurrent);
    }
  } catch (fsError) {
    console.warn('[API /github/current] Firestore unavailable, falling back to GitHub API:', fsError);
  }

  // 2. Fallback: GitHub API directly
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
    console.error('[API /github/current] GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current project' },
      { status: 500 }
    );
  }
}
