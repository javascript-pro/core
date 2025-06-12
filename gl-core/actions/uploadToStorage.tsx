// core/gl-core/cartridges/Fallmanager/actions/uploadFile.tsx

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
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

function getFileExtension(filename: string): string {
  const match = filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  return match ? `.${match[1].toLowerCase()}` : '';
}

export const uploadToStorage =
  ({ file, slug }: UploadArgs) =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const cleanSlug = generateSlugFromFilename(file.name);
      const extension = getFileExtension(file.name);
      const uploadsRef = collection(db, 'uploads');

      // Check for existing upload with same name and size
      const q = query(
        uploadsRef,
        where('name', '==', file.name),
        where('size', '==', file.size),
      );

      const existing = await getDocs(q);

      if (!existing.empty) {
        dispatch(
          toggleFeedback({
            severity: 'warning',
            title: 'Already uploaded',
            description: `"${file.name}" has already been uploaded`,
          }),
        );
        return;
      }

      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;
      const storagePath = `fallmanager/${filename}`;
      const storageRef = ref(storage, storagePath);

      dispatch(
        toggleFeedback({
          severity: 'info',
          title: `Uploading ${file.name}...`,
        }),
      );

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(uploadsRef, {
        name: file.name, // original name
        filename, // unique storage file name
        storagePath, // exact path used in Firebase Storage
        cartridge: slug,
        slug: cleanSlug,
        url,
        type: file.type,
        size: file.size,
        extension,
        uploadedAt: serverTimestamp(),
      });

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Upload complete',
          description: `"${file.name}" uploaded`,
        }),
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: 'Upload failed',
          description: msg,
        }),
      );
    }
  };
