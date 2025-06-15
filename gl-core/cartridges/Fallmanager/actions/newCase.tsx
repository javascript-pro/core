// core/gl-core/cartridges/Fallmanager/actions/newCase.tsx
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback, setUbereduxKey } from '../../../../gl-core';

export const newCase =
  (newCaseObj: { clientName: string } | null): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      if (!newCaseObj || typeof newCaseObj.clientName !== 'string') {
        dispatch(
          toggleFeedback({
            severity: 'error',
            title: 'Call this action with a valid case object',
          }),
        );
        return;
      }

      const docRef = await addDoc(collection(db, 'fallmanager'), {
        ...newCaseObj,
        createdAt: serverTimestamp(),
      });

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Case created',
          description: `Document ID: ${docRef.id}`,
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
