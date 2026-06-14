import { NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github';

export async function POST() {
  try {
    const service = GitHubService.getInstance();
    await service.refreshCache();
    return NextResponse.json({
      success: true,
      message: 'Cache refreshed successfully.',
    });
  } catch (error) {
    console.error('[API /github/refresh]', error);
    return NextResponse.json(
      { error: 'Failed to refresh cache' },
      { status: 500 }
    );
  }
}
