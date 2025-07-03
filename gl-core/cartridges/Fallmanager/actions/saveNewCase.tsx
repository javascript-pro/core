'use client';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';

export const saveNewCase =
  (clientName: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      // console.log('saveNewCase', clientName);
      const current = getState().redux.fallmanager;

      // Start saving state
      dispatch(
        setUbereduxKey({
          key: 'fallmanager',
          value: {
            ...current,
            newCase: {
              ...current.newCase,
              saving: true,
            },
          },
        }),
      );

      // Create new Firestore doc
      const docRef = await addDoc(collection(db, 'fallmanager'), {
        clientName,
        createdAt: serverTimestamp(),
      });

      // Update redux with new case and ID
      dispatch(
        setUbereduxKey({
          key: 'fallmanager',
          value: {
            ...current,
            newCase: {
              clientName,
              id: docRef.id,
              saving: false,
            },
          },
        }),
      );

      return docRef.id;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      return null;
    }
  };
