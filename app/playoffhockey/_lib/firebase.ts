'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_PLAYOFF_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_PLAYOFF_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PLAYOFF_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PLAYOFF_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PLAYOFF_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_PLAYOFF_FIREBASE_APP_ID,
};

let cached: { app: FirebaseApp; auth: Auth; db: Firestore } | null = null;

export function getFirebase() {
  if (cached) return cached;
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  cached = { app, auth: getAuth(app), db: getFirestore(app) };
  return cached;
}
