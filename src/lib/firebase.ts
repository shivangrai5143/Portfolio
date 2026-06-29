import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore, enableIndexedDbPersistence, setLogLevel } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Lazy singletons — Firebase is NOT initialized at module load time.
// This prevents crashes during Next.js build-time page data collection
// when NEXT_PUBLIC_FIREBASE_* env vars are absent on the build machine.
let _app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;

function getApp(): FirebaseApp {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return _app;
}

export function getDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getApp());
    // Silence connection warnings ('Could not reach Cloud Firestore backend') by setting log level to 'error'
    setLogLevel('error');
    // Enable offline persistence on client side
    if (typeof window !== 'undefined') {
      enableIndexedDbPersistence(_db).catch((err) => {
        console.warn('[Firestore] Offline persistence initialization failed:', err.code);
      });
    }
  }
  return _db;
}

export function getAuthInstance(): Auth {
  if (!_auth) _auth = getAuth(getApp());
  return _auth;
}

// Keep default export for any code that imports the app object directly
export default getApp;
