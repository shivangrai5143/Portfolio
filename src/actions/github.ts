'use server';

import { syncGitHubToFirestore } from '@/services/github-sync';

/**
 * Server action to manually trigger a GitHub sync.
 * This can be called from an Admin dashboard button.
 */
export async function triggerGitHubSync() {
  try {
    const result = await syncGitHubToFirestore();
    return { success: true, count: result.count, error: null };
  } catch (error) {
    console.error('GitHub sync failed:', error);
    return { success: false, count: 0, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
