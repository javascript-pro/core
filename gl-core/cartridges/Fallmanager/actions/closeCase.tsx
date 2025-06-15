import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback, setUbereduxKey } from '../../../../gl-core';

export const closeCase = (id: string, user: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const ref = doc(db, 'fallmanager', id);

      await updateDoc(ref, {
        caseClosed: true,
        closedAt: serverTimestamp(),
        closedBy: user,
      });

      dispatch(
        toggleFeedback({
          severity: 'success',
          title: 'Nice one! Case closed.',
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
