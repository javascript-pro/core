// core/gl-core/cartridges/Fallmanager/actions/deleteUpload.tsx

import {
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback, setUbereduxKey } from '../../../../gl-core';

export type TUpload = {
  id: string;
};

export const deleteUpload =
  (id = 'notset'): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      if (typeof window !== 'undefined') {
        const confirmed = window.confirm(
          'Are you sure you want to permanently delete this upload? This action cannot be undone.'
        );
        if (!confirmed) return;
      }

      console.log('deleteUpload', id);

      const uploadDocRef = doc(db, 'uploads', id);
      const uploadDocSnap = await getDoc(uploadDocRef);

      if (!uploadDocSnap.exists()) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: `No document found with id: ${id}`,
          })
        );
        return;
      }

      const data = uploadDocSnap.data();
      const storagePath = data?.storagePath || data?.path;

      if (!storagePath) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Missing storage path for file',
          })
        );
        return;
      }

      const fileRef = ref(storage, storagePath);
      await deleteObject(fileRef);

      await deleteDoc(uploadDocRef);

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Upload deleted successfully',
        })
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      dispatch(
        toggleFeedback({
          severity: 'error',
          title: msg,
        })
      );
    }
  };
