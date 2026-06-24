import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';
import { getDocument } from '@/lib/firestore';

export const dynamic = 'force-dynamic';
import type { GitHubRepo } from '@/types';

export async function GET() {
  try {
    // 1. Try to fetch from Firestore
    const fsCurrent = await getDocument<GitHubRepo>('platform', 'currentProject');
    if (fsCurrent) {
      return NextResponse.json(fsCurrent);
    }

    // 2. Fallback to GitHub API directly if Firestore is empty
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
