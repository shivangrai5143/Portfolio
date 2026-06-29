import { getDb } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export type SyncStatus = 'success' | 'error';

export interface SyncLog {
  status: SyncStatus;
  startedAt: string; // ISO string
  completedAt: string; // ISO string
  durationMs: number;
  message?: string;
  error?: string;
  projectsSynced?: number;
  skillsSynced?: number;
}

export async function logSync(log: SyncLog) {
  try {
    const db = getDb();
    if (!db) {
      console.warn('[SyncLogger] Firestore is not configured. Sync logging skipped.');
      return;
    }
    const logsRef = collection(db, 'syncLogs');
    await addDoc(logsRef, {
      ...log,
      timestamp: serverTimestamp(),
    });
    console.log(`[SyncLogger] Logged ${log.status} sync to Firestore.`);
  } catch (error) {
    console.error('[SyncLogger] Failed to write sync log:', error);
  }
}
