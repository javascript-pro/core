// core/gl-core/firebase.tsx

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize app if not already initialized
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

// Fallmanager Collections
export const fallmanagerCollection = collection(db, 'fallmanager');

export const uploadsCollectionQuery = query(
  collection(db, 'uploads'),
  where('cartridge', '==', 'fallmanager'),
);

// Storage path for Fallmanager uploads
export const fallmanagerStorageRef = ref(storage, 'fallmanager');
