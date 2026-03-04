import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Guard: skip initialization during docker build / CI when env vars are absent.
// NEXT_PUBLIC_* vars are baked in at build time — if missing, initializeApp would throw.
const isConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (isConfigured) {
  console.log("[Firebase] Initializing with config:", {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
  });
}

// Reuse existing app instance if already initialized (e.g. hot-reload), otherwise init only when configured
const app = isConfigured
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : (getApps().length > 0 ? getApp() : null);

// Initialize Firebase services — will be null during build without env vars (safe: never called server-side at build time)
export const auth = app ? getAuth(app) : (null as unknown as ReturnType<typeof getAuth>);
export const db = app ? getFirestore(app) : (null as unknown as ReturnType<typeof getFirestore>);
export const storage = app ? getStorage(app) : (null as unknown as ReturnType<typeof getStorage>);

if (isConfigured && app) {
  console.log("[Firebase] Firestore initialized with project:", firebaseConfig.projectId || "unknown");
}

export default app!
