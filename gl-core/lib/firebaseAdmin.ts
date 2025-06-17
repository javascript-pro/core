// core/gl-core/lib/firebaseAdmin.ts

import {
  initializeApp,
  getApps,
  cert,
  applicationDefault,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  // Decode base64 and parse JSON
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString(
      'utf-8',
    ),
  );
  credential = cert(serviceAccount);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Parse direct JSON string (for compatibility)
  credential = cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
} else {
  // Fall back to GCP Application Default Credentials if available
  credential = applicationDefault();
}

const app = getApps().length ? getApps()[0] : initializeApp({ credential });

export const adminDb = getFirestore(app);
