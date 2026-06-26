import { getAdminDb } from './firebase-admin';
import type { DocumentData } from 'firebase-admin/firestore';

/**
 * Fetch a single document by collection + docId using Admin SDK.
 * Returns null if the document doesn't exist.
 */
export async function getAdminDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  const db = getAdminDb();
  const snapshot = await db.collection(collectionName).doc(docId).get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() } as T;
}

/**
 * Fetch all documents in a collection using Admin SDK.
 * Optionally accepts an orderBy field and direction.
 */
export async function getAdminCollection<T>(
  collectionName: string,
  orderByField?: string,
  direction: 'asc' | 'desc' = 'desc'
): Promise<T[]> {
  const db = getAdminDb();
  let q: FirebaseFirestore.Query<DocumentData> = db.collection(collectionName);
  if (orderByField) {
    q = q.orderBy(orderByField, direction);
  }
  const snapshot = await q.get();
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}
