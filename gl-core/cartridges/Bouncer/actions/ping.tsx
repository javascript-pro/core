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

      // Exit early if hostname is localhost
      if (ping.id.startsWith('localhost')) {
        console.log('No pinging from localhost');
        return;
      }

      const ref = doc(db, 'pings', ping.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        console.log('Fingerprint already exists in Firestore', ping.id);
        dispatch(setBouncerKey('checked', true));
      } else {
        console.log('Creating new ping in Firestore', ping.id);
        await setDoc(ref, {
          ...ping,
          created: Date.now(),
          updated: Date.now(),
        });
        dispatch(setBouncerKey('checked', true));
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
