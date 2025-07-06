// core/gl-core/cartridges/Fallmanager/actions/deleteFile.tsx
'use client';

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';

export const deleteFile =
  (id: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const docRef = doc(db, 'files', id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Dokument nicht gefunden',
          }),
        );
        return;
      }

      const data = snapshot.data();
      const path = data.storagePath;

      if (!path) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'storagePath fehlt',
          }),
        );
        return;
      }

      const fileRef = ref(storage, path);

      await deleteObject(fileRef);
      await deleteDoc(docRef);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: msg,
        }),
      );
    }
  };
