// /Users/goldlabel/GitHub/core/gl-core/cartridges/Bouncer/ping.tsx
import { TUbereduxDispatch } from '../../Uberedux';
import { setUbereduxKey } from '../../Uberedux';
import { setBouncerKey } from '../';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const ping =
  () => async (dispatch: TUbereduxDispatch, getState: any) => {
    try {
      const state = getState();
      const ping = state?.redux.bouncer?.ping;

      if (!ping?.id) {
        throw new Error('No ping id available');
      }

      const ref = doc(db, 'pings', ping.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        console.log(
          'Fingerprint already exists in Firestore, updating timestamp',
          ping.id,
        );
        await setDoc(ref, { updated: Date.now() }, { merge: true });
        dispatch(setBouncerKey('pinged', true));
      } else {
        console.log('Creating new ping in Firestore', ping.id);
        await setDoc(ref, {
          ...ping,
          created: Date.now(),
          updated: Date.now(),
        });
        dispatch(setBouncerKey('pinged', true));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
