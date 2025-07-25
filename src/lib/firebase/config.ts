import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore as createFirestore, type Firestore } from 'firebase/firestore';

// Validate required environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

// Check for missing environment variables
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingVars.length > 0) {
  console.error('Missing required Firebase environment variables:', missingVars);
  console.error('Please check your .env.local file and ensure all VITE_FIREBASE_* variables are set');
}

// Firebase config - using environment variables for secure configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (!app && typeof window !== 'undefined') {
    try {
      app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error('Failed to initialize Firebase app:', error);
      throw new Error('Firebase initialization failed. Please check your configuration.');
    }
  }
  
  if (!app) {
    throw new Error('Firebase app not available. This function should only be called in the browser.');
  }
  
  return app;
};

export const getFirestore = (): Firestore => {
  if (!db && typeof window !== 'undefined') {
    try {
      db = createFirestore(getFirebaseApp());
    } catch (error) {
      console.error('Failed to initialize Firestore:', error);
      throw new Error('Firestore initialization failed.');
    }
  }
  
  if (!db) {
    throw new Error('Firestore not available. This function should only be called in the browser.');
  }
  
  return db;
};