// core/gl-core/cartridges/Fallmanager/actions/seedFirebase.tsx
'use client';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey } from '../../../../gl-core';
import seedData from '../sampleCases.json';

export const seedFirebase =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const colRef = collection(db, 'fallmanager');

      for (const caseData of seedData) {
        await addDoc(colRef, {
          ...caseData,
          createdAt: serverTimestamp(),
        });
      }

      return true;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
      return null;
    }
  };
