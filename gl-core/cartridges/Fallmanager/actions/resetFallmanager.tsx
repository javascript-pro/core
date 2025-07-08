// core/gl-core/cartridges/Fallmanager/actions/resetFallmanager.tsx
import { setUbereduxKey } from '../../../../gl-core';
import { db } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { initialState } from '../initialState';
import { incomingCases, incomingFiles } from '../../Fallmanager';

export const resetFallmanager = (): any => async (dispatch: any) => {
  try {
    dispatch(setUbereduxKey({ key: 'fallmanager', value: initialState }));

    const [casesSnap, filesSnap] = await Promise.all([
      getDocs(collection(db, 'fallmanager')),
      getDocs(collection(db, 'files')),
    ]);

    const cases = Object.fromEntries(
      casesSnap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
    );

    const files = Object.fromEntries(
      filesSnap.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
    );

    dispatch(incomingCases(cases));
    dispatch(incomingFiles(files));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    dispatch(setUbereduxKey({ key: 'error', value: msg }));
  }
};
