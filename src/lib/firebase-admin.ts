import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let _adminApp: App | null = null;
let _adminDb: Firestore | null = null;

function getAdminApp(): App {
  if (_adminApp) return _adminApp;

  if (getApps().length > 0) {
    _adminApp = getApps()[0];
    return _adminApp;
  }

  // Use a service account JSON if provided, otherwise fall back to
  // individual env vars (useful for Vercel environment variables UI).
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccountJson) {
    const serviceAccount = JSON.parse(serviceAccountJson);
    _adminApp = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  } else {
    // Minimal credential using individual env vars
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (projectId && clientEmail && privateKey) {
      _adminApp = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        projectId,
      });
    } else if (projectId) {
      // No service account — initialize without credentials (works in some environments)
      // This will fail on Vercel but lets the app start without crashing
      _adminApp = initializeApp({ projectId });
    } else {
      throw new Error(
        'Firebase Admin SDK not configured. Set FIREBASE_SERVICE_ACCOUNT_JSON or ' +
        'FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY env vars.'
      );
    }
  }

  return _adminApp;
}

export function getAdminDb(): Firestore {
  if (!_adminDb) {
    _adminDb = getFirestore(getAdminApp());
  }
  return _adminDb;
}
