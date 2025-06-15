// core/gl-core/cartridges/Fallmanager/actions/newCase.tsx
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../../../../gl-core/lib/firebase';
import { TUbereduxDispatch } from '../../../../gl-core/types';
import { toggleFeedback, setUbereduxKey } from '../../../../gl-core';

export const newCase =
  (newCaseObj = null): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      console.log('newCaseObj', newCaseObj);

      dispatch(
        toggleFeedback({
          severity: 'error',
          title: 'Call this action with a valid newCase object',
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
