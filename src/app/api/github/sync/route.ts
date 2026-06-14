import { NextResponse } from 'next/server';
import { syncGitHubToFirestore } from '@/services/github-sync';

// Secret token to prevent unauthorized syncs
const SYNC_SECRET = process.env.GITHUB_SYNC_SECRET || 'default-secret-change-in-production';

export async function POST(request: Request) {
  try {
    // Basic auth check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${SYNC_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await syncGitHubToFirestore();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Webhook sync failed:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
