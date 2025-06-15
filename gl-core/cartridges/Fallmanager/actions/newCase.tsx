// core/gl-core/cartridges/Fallmanager/actions/newCase.tsx

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback, setUbereduxKey } from '../../../../gl-core';

type NewCaseInput = {
  party1: string;
  party2: string;
  caseName: string;
  slug: string;
};

export const newCase =
  (newCaseObj: NewCaseInput | null): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      if (
        !newCaseObj ||
        typeof newCaseObj.party1 !== 'string' ||
        typeof newCaseObj.party2 !== 'string' ||
        typeof newCaseObj.caseName !== 'string' ||
        typeof newCaseObj.slug !== 'string'
      ) {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Invalid case object',
            description: 'Please provide party1, party2, caseName, and slug',
          }),
        );
        return;
      }

      const docRef = await addDoc(collection(db, 'fallmanager'), {
        ...newCaseObj,
        createdAt: serverTimestamp(),
        caseClosed: false,
      });

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Case created',
          description: `${newCaseObj.caseName}`,
        }),
      );
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
