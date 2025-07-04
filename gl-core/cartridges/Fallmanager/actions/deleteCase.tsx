'use client';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const deleteCase =
  (id: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      if (!id) return null;

      // Optional: set loading or UI feedback state here
      const current = getState().redux.fallmanager;

      // Perform the delete in Firestore
      await deleteDoc(doc(db, 'fallmanager', id));

      // Optional: clear selected case or trigger UI updates
      dispatch(
        setUbereduxKey({
          key: 'fallmanager',
          value: {
            ...current,
            selectedCaseId: null,
          },
        }),
      );

      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      return null;
    }
  };
