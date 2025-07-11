import * as admin from 'firebase-admin';
import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString(
      'utf-8',
    ),
  );
  credential = cert(serviceAccount);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
} else {
  credential = applicationDefault();
}

const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential,
      storageBucket,
    });

const db = getFirestore(app);

// ✅ Set ignoreUndefinedProperties after initialization
db.settings({ ignoreUndefinedProperties: true });

export const adminDb = db;
export const adminStorage = getStorage(app);
export { admin };
