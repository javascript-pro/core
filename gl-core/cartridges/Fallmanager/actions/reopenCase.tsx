import { doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../../../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback, setUbereduxKey } from '../../../../gl-core';

export const reopenCase =
  (id: string, user: any): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const ref = doc(db, 'fallmanager', id);

      await updateDoc(ref, {
        caseClosed: false,
        closedAt: deleteField(),
        closedBy: deleteField(),
      });

      dispatch(
        toggleFeedback({
          severity: 'warning',
          title: 'Boo. Case reopened.',
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
