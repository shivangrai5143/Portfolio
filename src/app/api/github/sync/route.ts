import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { syncGitHubToFirestore } from '@/services/github-sync';
import { logSync } from '@/services/sync-logger';
import { getDocument, setDocument } from '@/lib/firestore';

const SYNC_SECRET = process.env.GITHUB_SYNC_SECRET || 'default-secret-change-in-production';

export async function POST(request: Request) {
  const startTime = Date.now();
  const startedAt = new Date().toISOString();

  try {
    // 1. Security Check (Bearer Token OR HMAC Signature)
    const authHeader = request.headers.get('authorization');
    const signatureHeader = request.headers.get('x-hub-signature-256');
    
    let isAuthorized = false;

    if (authHeader === `Bearer ${SYNC_SECRET}`) {
      isAuthorized = true;
    } else if (signatureHeader) {
      const bodyText = await request.text();
      const hmac = crypto.createHmac('sha256', SYNC_SECRET);
      const digest = 'sha256=' + hmac.update(bodyText).digest('hex');
      if (crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(digest))) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      const durationMs = Date.now() - startTime;
      await logSync({
        status: 'error',
        startedAt,
        completedAt: new Date().toISOString(),
        durationMs,
        error: 'Unauthorized request',
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Rate Limiting Check (10 minutes)
    const sysConfig = await getDocument<{ lastSyncTime: number }>('settings', 'system');
    const COOLDOWN_MS = 10 * 60 * 1000;

    if (sysConfig && sysConfig.lastSyncTime) {
      const timeSinceLastSync = Date.now() - sysConfig.lastSyncTime;
      if (timeSinceLastSync < COOLDOWN_MS) {
        const remainingMinutes = Math.ceil((COOLDOWN_MS - timeSinceLastSync) / 60000);
        return NextResponse.json(
          { error: `Rate limit exceeded. Try again in ${remainingMinutes} minutes.` },
          { status: 429 }
        );
      }
    }

    // 3. Execute Sync
    const result = await syncGitHubToFirestore();

    // 4. Update Rate Limit Timestamp
    await setDocument('settings', 'system', { lastSyncTime: Date.now() });

    // 5. Log Success
    const durationMs = Date.now() - startTime;
    await logSync({
      status: 'success',
      startedAt,
      completedAt: new Date().toISOString(),
      durationMs,
      message: 'Sync completed via webhook',
      projectsSynced: result.count,
      skillsSynced: result.skillsCount,
    });

    return NextResponse.json(result);
  } catch (error) {
    const durationMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log Error
    await logSync({
      status: 'error',
      startedAt,
      completedAt: new Date().toISOString(),
      durationMs,
      error: errorMessage,
    });

    console.error('Webhook sync failed:', error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
