'use client';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import { emptyCase } from '../examples/caseObj';

export const saveNewCase =
  (clientName: string): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
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

      // Clone and update the emptyCase template
      const newCaseData = {
        ...emptyCase,
        clientName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'fallmanager'), newCaseData);

      // Save new case state with generated ID
      dispatch(
        setUbereduxKey({
          key: 'fallmanager',
          value: {
            ...current,
            newCase: {
              ...newCaseData,
              caseId: docRef.id,
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
