import { TUbereduxDispatch } from '../../../../gl-core/types';
import { setUbereduxKey, toggleFeedback } from '../../../../gl-core';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export const ping =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState();
      const bouncer = state?.redux?.bouncer;
      const visitor = bouncer?.visitor;

      // The id is nested under visitor.fingerprint.id
      const fingerprint = visitor?.fingerprint;
      const id = fingerprint?.id;

      if (!id || typeof id !== 'string' || id.trim() === '') {
        console.warn('ping: no visitor.fingerprint.id available, skipping ping');
        return;
      }

      const now = Date.now();

      // Create a flattened visitor doc (no nested fingerprint key)
      const updatedVisitor = {
        ...fingerprint,     // spread original fingerprint fields
        lastUpdated: now,  // add/overwrite timestamp
      };

      // Firestore (merge: true will create if missing)
      await setDoc(doc(db, 'visitors', id), updatedVisitor, { merge: true });

      // Feedback (optional)
      dispatch(
        toggleFeedback({
          severity: 'success',
          title: `Pinged visitor ${id}`,
        }),
      );

      // Update Redux with flattened visitor
      dispatch(
        setUbereduxKey({
          key: 'bouncer',
          value: {
            ...bouncer,
            visitor: {
              ...visitor,
              fingerprint: updatedVisitor, // still keep in redux under .fingerprint
            },
          },
        }),
      );

      // console.log('ping: wrote visitor doc', id, updatedVisitor);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('ping error', msg);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
