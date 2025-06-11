// core/gl-core/cartridges/Fallmanager/actions/uploadToStorage.tsx

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../gl-core';

interface UploadArgs {
  file: File;
  slug: string;
}

function generateSlugFromFilename(name: string): string {
  const baseName = name.replace(/\.[^/.]+$/, ''); // Remove extension
  return encodeURIComponent(baseName.toLowerCase().replace(/\s+/g, '-'));
}

export const uploadToStorage =
  ({ file, slug }: UploadArgs) =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      dispatch(
        toggleFeedback({
          title: 'Uploading file...',
        }),
      );

      const filename = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `fallmanager/${filename}`);

      // Upload to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      const cleanSlug = generateSlugFromFilename(file.name);

      // Save metadata to Firestore
      const uploadsRef = collection(db, 'uploads');
      await addDoc(uploadsRef, {
        name: file.name,
        cartridge: slug,
        slug: cleanSlug,
        url,
        type: file.type,
        size: file.size,
        uploadedAt: serverTimestamp(),
      });

      dispatch(
        toggleFeedback({
          title: 'Upload complete',
          description: `File "${file.name}" uploaded successfully.`,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(
        toggleFeedback({
          title: 'Upload failed',
          description: msg,
        }),
      );
    }
  };
